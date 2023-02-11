import { Injectable } from '@nestjs/common';
import { GroupMessage } from './types/group-message';
import { PrivateMessage } from './types/private-message';

@Injectable()
export class QbotService {
  async handlePrivateMessage(payload: PrivateMessage) {}

  async handleGroupMessage(payload: GroupMessage) {}

  async sendMessage() {}
}
