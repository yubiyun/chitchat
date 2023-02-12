import { forwardRef, Module } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';
import { QbotController } from './qbot.controller';
import { QbotService } from './qbot.service';

@Module({
  imports: [forwardRef(() => ChatModule)],
  controllers: [QbotController],
  providers: [QbotService],
  exports: [QbotService],
})
export class QbotModule {}
