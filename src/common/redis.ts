import { Redis } from 'ioredis';
import { redis } from './configs';

export const redisClient = new Redis(redis.url, { keyPrefix: 'chitchat:' });
