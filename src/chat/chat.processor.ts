import _ from 'lodash';
import { Process, Processor } from '@nestjs/bull';
import { forwardRef, Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OpenaiService } from 'src/openai/openai.service';
import { QbotService } from 'src/qbot/qbot.service';
import { GroupMessage, MessageItem, PrivateMessage } from 'src/qbot/types/aio';

@Processor('chat')
export class ChatProcessor {
  private readonly logger = new Logger(ChatProcessor.name);

  constructor(
    private readonly oaService: OpenaiService,
    @Inject(forwardRef(() => QbotService))
    private readonly qbotService: QbotService,
  ) {}

  @Process('private')
  async handlePrivateChat(job: Job<PrivateMessage>) {
    this.logger.debug('handlePrivateChat');
    this.logger.debug(job.data);
    // NOTE: filter message text data from array
    const { message } = job.data as { message: MessageItem[] };
    const textArr = message.filter((msg) => msg.type === 'text');
    if (_.isEmpty(textArr)) {
      return;
    }
    const text = textArr.map((item) => item.data.text.trim()).join(' ');
    /**
     * 保留上下文
     */
    const res = await this.oaService.withContext(text, {
      qq: job.data.user_id,
    });
    this.logger.debug(res);
    await this.qbotService.replyPrivateMessage(job.data, res);
    // TODO: handle reply message
  }

  @Process('group')
  handleGroupChat(job: Job<GroupMessage>) {
    this.logger.debug('handleGroupChat');
    this.logger.debug(job.data);
  }
}
