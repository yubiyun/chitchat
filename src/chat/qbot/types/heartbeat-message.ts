import { BaseMessage } from './base-message';

export interface HeartbeatMessage extends BaseMessage {
  post_type: 'meta_event';
  message_type: 'heartbeat';
  meta_event_type: string;
  status: Status;
  interval: number;
}

export interface Status {
  app_enabled: boolean;
  app_good: boolean;
  app_initialized: boolean;
  good: boolean;
  online: boolean;
  plugins_good: any;
  stat: Stat;
}

export interface Stat {
  packet_received: number;
  packet_sent: number;
  packet_lost: number;
  message_received: number;
  message_sent: number;
  disconnect_times: number;
  lost_times: number;
  last_message_time: number;
}
