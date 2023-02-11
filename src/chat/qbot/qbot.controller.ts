import { Controller, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('qbot')
export class QbotController {
  private readonly logger = new Logger(QbotController.name);

  @Post('/push')
  pushMessage(@Req() req: Request) {
    this.logger.log(req.body);
    return { success: true };
  }
}
