import { Injectable, Logger } from '@nestjs/common';
import { GroupMessage } from './types/group-message';
import { PrivateMessage } from './types/private-message';

@Injectable()
export class QbotService {
  private readonly logger = new Logger(QbotService.name);

  async handlePrivateMessage(payload: PrivateMessage) {
    this.logger.log({
      from: payload.user_id,
      to: payload.self_id,
      msg: payload.raw_message,
      nickname: payload.sender.nickname,
    });
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
