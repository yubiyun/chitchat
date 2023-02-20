import { redisClient } from 'src/common/redis';

export interface ChatCtx {
  conversationId: string;
  parentMessageId: string;
}

export const keyStore = {
  users: 'users',
  ctx: 'ctx',
  getCtx: (uid: string) => `${keyStore.ctx}:${uid}`,
};

export async function addMember(uid: string) {
  return redisClient.sadd(keyStore.users, uid);
}

export async function checkIsMember(uid: string) {
  return redisClient.sismember(keyStore.users, uid);
}

export async function setCtx(uid: string, params: ChatCtx) {
  return redisClient.set(keyStore.getCtx(uid), JSON.stringify(params));
}

export async function getCtx(uid: string) {
  return redisClient.get(keyStore.getCtx(uid));
}
