import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OpenaiModule } from 'src/openai/openai.module';
import { QbotModule } from 'src/qbot/qbot.module';
import { ChatProcessor } from './chat.processor';
import { ChatService } from './chat.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'chat',
    }),
    OpenaiModule,
    QbotModule
  ],
  exports: [ChatService],
  providers: [ChatService, ChatProcessor],
})
export class ChatModule {}
