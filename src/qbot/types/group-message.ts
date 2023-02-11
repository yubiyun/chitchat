import { BaseMessage, Sender } from './base-message';

export interface GroupMessage extends BaseMessage {
  post_type: 'message';
  message_type: 'group';
  sender: Sender;
  sub_type: string;
  group_id: number;
  user_id: number;
  raw_message: string;
  message_id: number;
  anonymous: any;
  font: number;
  message: string;
  message_seq: number;
}
