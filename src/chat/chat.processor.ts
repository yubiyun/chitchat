import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OpenaiService } from 'src/openai/openai.service';
import { GroupMessage, PrivateMessage } from 'src/qbot/types/aio';

@Processor('chat')
export class ChatProcessor {
  private readonly logger = new Logger(ChatProcessor.name);

  constructor(private readonly oaService: OpenaiService) {}

  @Process('private')
  async handlePrivateChat(job: Job<PrivateMessage>) {
    this.logger.debug('handlePrivateChat');
    this.logger.debug(job.data);
    await this.oaService.example();
  }

  @Process('group')
  handleGroupChat(job: Job<GroupMessage>) {
    this.logger.debug('handleGroupChat');
    this.logger.debug(job.data);
  }
}
