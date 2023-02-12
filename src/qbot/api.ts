import axios from 'axios';
import { MessageItem } from './types/aio';

const client = axios.create({
  baseURL: 'http://127.0.0.1:3100',
  timeout: 2000,
});


export async function sendPrivateMessage(params: any) {
  const { data } = await client.post('/send_private_msg', params);
  return data
}
