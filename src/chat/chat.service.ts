import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { MessageType } from 'src/qbot/types/aio';

@Injectable()
export class ChatService {
  constructor(@InjectQueue('chat') private readonly chatQueue: Queue) {}

  async appendChat(msgType: MessageType, data: any) {
    await this.chatQueue.add(msgType, data);
  }
}
