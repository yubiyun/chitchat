import { Controller, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { QbotService } from './qbot.service';
import { GroupMessage, HeartbeatEvent, PrivateMessage } from './types/aio';

@Controller('qbot')
export class QbotController {
  private readonly logger = new Logger(QbotController.name);

  constructor(private readonly qbotSvc: QbotService) {}

  @Post('/push')
  async pushMessage(@Req() req: Request) {
    const payload: GroupMessage | PrivateMessage | HeartbeatEvent = req.body;
    const postType = payload.post_type;
    switch (postType) {
      case 'message':
        await this.handleMessage(payload);
        break;
      case 'meta_event':
        await this.handleMetaEvent(payload);
        break;
      default:
        this.logger.warn(`unknow post_type=${postType}`);
        break;
    }
    return { success: true };
  }

  async handleMessage(payload: GroupMessage | PrivateMessage) {
    const msgType = payload.message_type;
    switch (msgType) {
      case 'group':
        await this.qbotSvc.handleGroupMessage(payload);
        break;
      case 'private':
        await this.qbotSvc.handlePrivateMessage(payload);
        break;
      default:
        this.logger.warn(`unknown message_type=${msgType}`);
    }
  }

  async handleMetaEvent(payload: HeartbeatEvent) {}
}
