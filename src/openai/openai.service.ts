import { Injectable, Logger } from '@nestjs/common';
import { openai } from 'src/common/configs';
import { redisClient } from 'src/common/redis';

@Injectable()
export class OpenaiService {
  private readonly logger = new Logger(OpenaiService.name);
  private readonly key = openai.key;

  private api: any;

  constructor() {
    this.init()
      .catch((error) => {
        this.logger.error(error);
      })
      .finally(() => {
        this.logger.debug('init success');
      });
    // this.example()
    //   .catch((error) => this.logger.error(error))
    //   .finally(() => this.logger.debug('call example finished'));
  }

  async init() {
    const { ChatGPTAPI } = await import('chatgpt');
    this.api = new ChatGPTAPI({ apiKey: this.key }) as InstanceType<
      typeof ChatGPTAPI
    >;
    // await this.example();
  }

  async withoutContext(prompt: string) {
    try {
      const { ChatGPTAPI } = await import('chatgpt');
      const { oraPromise } = await import('ora');
      const api = this.api as InstanceType<typeof ChatGPTAPI>;

      const res = await oraPromise(api.sendMessage(prompt), { text: prompt });
      return res.text;
    } catch (error) {
      this.logger.error(error.message, error);
      return 'error';
    }
  }

  async withContext(
    prompt: string,
    extra: {
      qq: number;
    },
  ) {
    const { ChatGPTAPI } = await import('chatgpt');
    const { oraPromise } = await import('ora');

    const api = this.api as InstanceType<typeof ChatGPTAPI>;

    const ctxListKey = `ctx:${extra.qq}`;
    let res: any;
    /**
     * check is member
     */
    if (await redisClient.sismember('users', extra.qq)) {
      /**
       * get latest ctx
       */
      const [latest] = await redisClient.lrange(ctxListKey, -1, -1);
      const { conversationId, parentMessageId } = JSON.parse(latest) as {
        conversationId: string;
        parentMessageId: string;
      };
      this.logger.debug(`conversationId=${conversationId}`);
      this.logger.debug(`parentMessageId=${parentMessageId}`);
      /**
       * request answer
       */
      res = await oraPromise(
        api.sendMessage(prompt, {
          conversationId,
          parentMessageId,
        }),
        { text: prompt },
      );
    } else {
      await redisClient.sadd('users', extra.qq);
      res = await oraPromise(api.sendMessage(prompt), {
        text: prompt,
      });
    }
    /**
     * append latest ctx
     */
    await redisClient.rpush(
      ctxListKey,
      JSON.stringify({
        conversationId: res.conversationId,
        parentMessageId: res.id,
      }),
    );
    return res.text;
  }

  async example() {
    this.logger.debug('example');
    const { ChatGPTAPI } = await import('chatgpt');
    const { oraPromise } = await import('ora');

    const api = this.api as InstanceType<typeof ChatGPTAPI>;
    const prompt = 'Write a poem about cats.';

    let res = await oraPromise(api.sendMessage(prompt), {
      text: prompt,
    });

    console.log('\n' + res.text + '\n');

    const prompt2 = 'Can you make it cuter and shorter?';

    res = await oraPromise(
      api.sendMessage(prompt2, {
        conversationId: res.conversationId,
        parentMessageId: res.id,
      }),
      {
        text: prompt2,
      },
    );
    console.log('\n' + res.text + '\n');

    const prompt3 = 'Now write it in French.';

    res = await oraPromise(
      api.sendMessage(prompt3, {
        conversationId: res.conversationId,
        parentMessageId: res.id,
      }),
      {
        text: prompt3,
      },
    );
    console.log('\n' + res.text + '\n');

    const prompt4 = 'What were we talking about again?';

    res = await oraPromise(
      api.sendMessage(prompt4, {
        conversationId: res.conversationId,
        parentMessageId: res.id,
      }),
      {
        text: prompt4,
      },
    );
    console.log('\n' + res.text + '\n');
  }
}
