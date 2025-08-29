import { defineStore } from "pinia";
import type { ChatMessage, HistoryList } from "./type.ts";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import { getHistoryList } from "@/api/aichat";
//创建会话聊天的仓库
//会话列表的类型

export const useChatStore = defineStore("chat", () => {
  const chatList = ref<ChatMessage[]>([]); //会话列表
  const historyList = ref<HistoryList[]>([]); //历史记录
  const currentSessionId = ref<string>("");

  //生成会话id
  function generateSessionId() {
    if (chatList.value.length === 0 || !currentSessionId.value) {
      // const saved = localStorage.getItem("currentSessionId");
      currentSessionId.value = uuidv4();
      // localStorage.setItem("currentSessionId", currentSessionId.value);
    }
    return currentSessionId.value;
  }

  //获取历史记录列表
  async function getHistory() {
    const res = await getHistoryList();
    historyList.value = res.list;
  }

  //保存历史记录,本地存储
  function saveHistory(message: ChatMessage) {
    localStorage.setItem("history", JSON.stringify(message));
  }

  //点击历史消息,显示对话列表
  function getChatListByHistory(id: number) {
    currentSessionId.value = id.toString();
    const history = historyList.value.find(
      (item) => item.sessionId === currentSessionId.value
    );
    if (history) {
      chatList.value = history.messages;
    }
  }

  //创建新对话时，向历史记录中添加一条记录
  function updateHistoryAfterSend(message: ChatMessage) {
    // 如果当前 session 不存在历史记录中，先创建
    let session = historyList.value.find(
      (h) => h.sessionId === currentSessionId.value
    );

    //不存在
    if (!session) {
      session = {
        sessionId: currentSessionId.value,
        messages: [message],
        lastMessage: message.role === "user" ? message.content : "",
        timestamp: Date.now(),
      };
      historyList.value.unshift(session);
    }
    //只在首次 user 消息时设置 lastMessage
    if (!session.lastMessage && message.role === "user") {
      session.lastMessage = message.content;
    }

    //添加到historyList
    session.messages = chatList.value; // 或者用 session.messages = [...session.messages, message] 强制触发响应式

    //更新时间（用于排序）
    session.timestamp = Date.now();
  }

  //清空当前的聊天记录
  function clearChatList() {
    chatList.value = [];
    currentSessionId.value = "";
    // localStorage.removeItem("history");
  }
  return {
    chatList,
    historyList,
    currentSessionId,
    getHistory,
    saveHistory,
    generateSessionId,
    getChatListByHistory,
    clearChatList,
    updateHistoryAfterSend,
  };
});
