import * as config from 'config';

export const redis = {
  url: config.get<string>('redis.url'),
};

export const openai = {
  key: config.get<string>('openai.key'),
};
