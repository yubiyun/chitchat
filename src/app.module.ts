import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { redis } from './common/configs';
import { ChatModule } from './chat/chat.module';
import { QbotModule } from './qbot/qbot.module';

@Module({
  imports: [
    BullModule.forRoot({
      url: redis.url,
      prefix: 'chitchat',
    }),
    ChatModule,
    QbotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
