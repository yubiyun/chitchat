import { Injectable, Logger } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { GroupMessage, PrivateMessage } from './types/aio';

@Injectable()
export class QbotService {
  private readonly logger = new Logger(QbotService.name);

  constructor(private readonly chatService: ChatService) {}

  async handlePrivateMessage(payload: PrivateMessage) {
    await this.chatService.appendChat('private', payload);
  }

  async handleGroupMessage(payload: GroupMessage) {
    await this.chatService.appendChat('group', payload);
  }

  async sendMessage() {}
}
