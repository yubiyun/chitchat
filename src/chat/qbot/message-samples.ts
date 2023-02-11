/**
 * 群聊消息
 */
const groupMessage = {
  post_type: 'message',
  message_type: 'group',
  time: 1676123329,
  self_id: 936787599, // 机器人
  sub_type: 'normal',
  group_id: 1102957926, // 群号
  sender: {
    age: 0,
    area: '',
    card: '',
    level: '',
    nickname: 'BiuBiuBot',
    role: 'member',
    sex: 'unknown',
    title: '',
    user_id: 993503449, // 发信人
  },
  user_id: 993503449, // 发信人
  raw_message: '测试', // 消息内容
  message_id: 873155046,
  anonymous: null,
  font: 0,
  message: '测试', // 消息内容
  message_seq: 332, // 消息序列
};

/**
 * 心跳包
 */
const heartbeat = {
  post_type: 'meta_event',
  meta_event_type: 'heartbeat',
  time: 1676123777,
  self_id: 936787599,
  status: {
    app_enabled: true,
    app_good: true,
    app_initialized: true,
    good: true,
    online: true,
    plugins_good: null,
    stat: {
      packet_received: 249,
      packet_sent: 233,
      packet_lost: 0,
      message_received: 1,
      message_sent: 0,
      disconnect_times: 0,
      lost_times: 0,
      last_message_time: 1676123768,
    },
  },
  interval: 5000,
};

/**
 * 私聊消息
 */
const privateMessage = {
  post_type: 'message',
  message_type: 'private',
  time: 1676123768,
  self_id: 936787599,
  sub_type: 'friend',
  raw_message: '1234567',
  font: 0,
  sender: {
    age: 0,
    nickname: 'BiuBiuBot',
    sex: 'unknown',
    user_id: 993503449,
  },
  message_id: 1834328022,
  user_id: 993503449,
  target_id: 936787599,
  message: '1234567',
};
