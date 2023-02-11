import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ChatService {
  constructor(@InjectQueue('chat') private readonly chatQueue: Queue) {}

  async appendChat(data: any) { // FIXME: fix any type
    await this.chatQueue.add('private', data);
  }
}
