/**
 * @see https://docs.go-cqhttp.org/event
 * @see https://docs.go-cqhttp.org/reference/data_struct.html
 */

export interface PostEvent {
  time: number;
  self_id: number;
  post_type: 'message' | 'message_sent' | 'request' | 'notice' | 'meta_event';
}

/**
 * 元事件
 */
export interface PostMeta extends PostEvent {
  post_type: 'meta_event';
  meta_event_type: 'lifecycle' | 'heartbeat';
}

export interface HeartbeatEvent extends PostMeta {
  meta_event_type: 'heartbeat';
  status: Status;
  interval: number;
}

interface Status {
  app_enabled: boolean;
  app_good: boolean;
  app_initialized: boolean;
  good: boolean;
  online: boolean;
  plugins_good: any;
  stat: Stat;
}

interface Stat {
  packet_received: number;
  packet_sent: number;
  packet_lost: number;
  message_received: number;
  message_sent: number;
  disconnect_times: number;
  lost_times: number;
  last_message_time: number;
}

/**
 * 消息
 */
export interface PostMessage extends PostEvent {
  post_type: 'message' | 'message_sent';
  message_type: 'private' | 'group';
  sub_type: string;
  message_id: number;
  user_id: number;
  message: MessageItem[];
  raw_message: string;
  sender: PostMessageSender;
}

interface MessageItem {}

interface PostMessageSender {
  user_id: number;
  nickname: string;
  sex: 'male' | 'female' | 'unknown';
  age: number;
}

/**
 * 群聊消息
 */
export interface GroupMessage extends PostMessage {
  post_type: 'message';
  message_type: 'group';
  group_id: number;
  message_seq: number;
  sub_type: 'normal' | 'anonymous' | 'notice';
}

/**
 * 私聊消息
 */
export interface PrivateMessage extends PostMessage {
  post_type: 'message';
  message_type: 'private';
  target_id: number;
  sub_type: 'friend' | 'group' | 'group_self' | 'other';
}
