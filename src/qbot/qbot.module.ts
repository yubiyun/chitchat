import { Module } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';
import { QbotController } from './qbot.controller';
import { QbotService } from './qbot.service';

@Module({
  imports: [ChatModule],
  controllers: [QbotController],
  providers: [QbotService],
})
export class QbotModule {}
