export interface Message {
  _id: string;
  wa_id: string;
  name: string;
  message: string;
  timestamp: string;
  status: string;
  meta_msg_id?: string;
  conversation_id?: string;
  __v?: number;
}

export interface Chat {
  _id: string;
  name: string;
  lastMessage: string;
  lastTimestamp: string;
}