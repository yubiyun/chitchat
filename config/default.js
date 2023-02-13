module.exports = {
  redis: {
    url: process.env.REDIS_URL,
  },
  openai: {
    key: process.env.OPENAI_KEY,
  },
  cqhttp: {
    host: process.env.CQHTTP_HOST,
  },
};
