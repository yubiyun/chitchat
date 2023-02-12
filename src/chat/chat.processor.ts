import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { GroupMessage, PrivateMessage } from 'src/qbot/types/aio';

@Processor('chat')
export class ChatProcessor {
  private readonly logger = new Logger(ChatProcessor.name);

  @Process('private')
  handlePrivateChat(job: Job<PrivateMessage>) {
    this.logger.debug(job.name);
    this.logger.debug(job.data);
  }

  @Process('group')
  handleGroupChat(job: Job<GroupMessage>) {
    this.logger.debug(job.name);
    this.logger.debug(job.data);
  }
}
