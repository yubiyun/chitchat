export enum PostType {
  Message = 'message',
  MetaEvent = 'meta_event',
}

export enum MessageType {
  Group = 'group',
  Heartbeat = 'heartbeat',
  Private = 'private',
}

export interface BaseMessage {
  post_type: 'message' | 'meta_event';
  message_type: 'group' | 'heartbeat' | 'private';
  time: number;
  self_id: number;
}

export interface Sender {
  age: number;
  nickname: string;
  sex: string;
  user_id: number;
}
