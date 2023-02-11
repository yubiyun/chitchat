import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ChatProcessor } from './chat.processor';
import { ChatService } from './chat.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'chat',
    }),
  ],
  exports: [ChatService],
  providers: [ChatService, ChatProcessor],
})
export class ChatModule {}
