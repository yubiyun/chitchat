import { Injectable, Logger } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { sendPrivateMessage } from './api';
import { GroupMessage, MessageItem, PrivateMessage } from './types/aio';

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

  async replyPrivateMessage(req: PrivateMessage, res: string) {
    const { user_id } = req;
    const message: MessageItem[] = [{ type: 'text', data: { text: res } }];
    this.logger.debug({ user_id, message });
    await sendPrivateMessage({ user_id, message });
  }
}
