import { Injectable, Logger } from '@nestjs/common';
import { openai } from 'src/common/configs';
import { ChatCtx, getCtx, setCtx } from './helper';

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

  async withoutContext(params: { prompt: string }) {
    const { prompt } = params;
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

  async withContext(params: { prompt: string; uid: string }) {
    const { ChatGPTAPI } = await import('chatgpt');
    const { oraPromise } = await import('ora');

    const { prompt, uid } = params;

    const api = this.api as InstanceType<typeof ChatGPTAPI>;

    const strCtx = (await getCtx(uid)) || '{}';
    this.logger.debug(`ctx=${strCtx}`);
    try {
      const ctx = JSON.parse(strCtx) as ChatCtx;
      const res = await oraPromise(
        api.sendMessage(prompt, {
          ...ctx,
        }),
        {
          text: prompt,
        },
      );
      const newCtx = {
        conversationId: res.conversationId,
        parentMessageId: res.id,
      };
      await setCtx(uid, newCtx);
      // this.logger.debug(res)
      return res.text;
    } catch (error) {
      this.logger.error(error);
      return error.message;
    }
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
