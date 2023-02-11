import * as config from 'config';

export const redis = {
  url: config.get<string>('redis.url'),
};
