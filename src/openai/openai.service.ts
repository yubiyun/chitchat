import { Injectable, Logger } from '@nestjs/common';
import { openai } from 'src/common/configs';

@Injectable()
export class OpenaiService {
  private readonly logger = new Logger(OpenaiService.name);
  private readonly key = openai.key;

  // private readonly api = new ChatGPTAPI({ apiKey: this.key });

  async withoutContext(prompt: string) {
    try {
      const { ChatGPTAPI } = await import('chatgpt');
      const { oraPromise } = await import('ora');

      const api = new ChatGPTAPI({ apiKey: this.key });

      const res = await oraPromise(api.sendMessage(prompt), { text: prompt });
      return res.text;
    } catch (error) {
      this.logger.error(error.message, error);
      return 'error';
    }
  }

  async example() {
    this.logger.debug('example');
    const { ChatGPTAPI } = await import('chatgpt');
    const { oraPromise } = await import('ora');

    const api = new ChatGPTAPI({ apiKey: this.key });
    const prompt = 'Write a poem about cats.';

    this.logger.debug(api);

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
