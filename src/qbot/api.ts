import axios from 'axios';
import { cqhttp } from 'src/common/configs';
import { MessageItem } from './types/aio';

const client = axios.create({
  baseURL: cqhttp.host,
  timeout: 2000,
});

export interface SendPrivateMessage {
  user_id: number;
  message: MessageItem[];
}

export async function sendPrivateMessage(params: SendPrivateMessage) {
  const { data } = await client.post('/send_private_msg', params);
  return data;
}
