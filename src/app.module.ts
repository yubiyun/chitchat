import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoService } from './common/mongo/mongo.service';
import { RedisService } from './common/redis/redis.service';
import { MqService } from './common/mq/mq.service';
import { ProducerService } from './chat/producer/producer.service';
import { ConsumerService } from './chat/consumer/consumer.service';
import { CqhttpController } from './chat/cqhttp/cqhttp.controller';

@Module({
  imports: [],
  controllers: [AppController, CqhttpController],
  providers: [AppService, MongoService, RedisService, MqService, ProducerService, ConsumerService],
})
export class AppModule { }
