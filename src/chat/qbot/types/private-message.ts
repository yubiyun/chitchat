import { BaseMessage, Sender } from './base-message';

export interface PrivateMessage extends BaseMessage {
  post_type: 'message';
  message_type: 'private';
  sender: Sender;
  sub_type: string;
  raw_message: string;
  font: number;
  message_id: number;
  user_id: number;
  target_id: number;
  message: string;
}
