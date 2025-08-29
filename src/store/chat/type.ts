//会话消息
export interface ChatMessage {
  id: string; // 唯一消息 ID
  sessionId: string; // 所属会话 ID
  role: "user" | "assistant";
  content: string;
  timestamp: number; // 消息时间戳，单位毫秒
  // 可选字段
  status?: "sending" | "sent" | "failed"; // 消息状态
}

export interface HistoryList {
  sessionId: string;
  messages: ChatMessage[];
  lastMessage: string;
  timestamp: number;
}
