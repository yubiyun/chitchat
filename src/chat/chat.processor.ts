import { Process, Processor } from '@nestjs/bull';
import { forwardRef, Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OpenaiService } from 'src/openai/openai.service';
import { QbotService } from 'src/qbot/qbot.service';
import { GroupMessage, PrivateMessage } from 'src/qbot/types/aio';

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
    // TODO: filter message text data from array
    const res = await this.oaService.withoutContext(job.data.raw_message);
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
