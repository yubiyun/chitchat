import { Injectable, Logger } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { GroupMessage } from './types/group-message';
import { PrivateMessage } from './types/private-message';

@Injectable()
export class QbotService {
  private readonly logger = new Logger(QbotService.name);

  constructor(private readonly chatService: ChatService) {}

  async handlePrivateMessage(payload: PrivateMessage) {
    const data = {
      from: payload.user_id,
      to: payload.self_id,
      msg: payload.raw_message,
      nickname: payload.sender.nickname,
    };
    this.logger.log(data);
    await this.chatService.appendChat(data);
  }

  async handleGroupMessage(payload: GroupMessage) {
    this.logger.log({
      group: payload.group_id,
      from: payload.user_id,
      to: payload.self_id,
      msg: payload.raw_message,
      nickname: payload.sender.nickname,
    });
  }

  async sendMessage() {}
}
