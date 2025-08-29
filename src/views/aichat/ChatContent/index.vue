<template>
  <div class="chat-header">
    <span>AI助手</span>
    <div>
      <ElButton type="primary" plain size="small" :icon="Setting">设置</ElButton>
      <ElButton type="primary" plain size="small" :icon="CirclePlus">新对话</ElButton>
    </div>
  </div>
  <div class="chat-container" ref="chatContainer">
    <div v-for="(message, index) in chatStore.chatList" :key="index" :class="['chat-message', message.role]">
      <div class="message-content markdown-body" v-html="renderMarkdown(message.content)" style="color: black;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useChatStore } from '../../../store/chat';
import { renderMarkdown } from '@/utils/markdown.ts';
import { ElButton } from 'element-plus';
import { Setting, CirclePlus } from '@element-plus/icons-vue';
const chatStore = useChatStore();
const chatContainer = ref<HTMLElement | null>(null);


// 监听消息列表长度变化，自动滚动到底部
watch(
  () => chatStore.chatList.length,
  () => {
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });
  }
);
</script>

<style scoped lang="scss">
.chat-header {
  // width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f4f6;
  height: 40px;
  border-radius: 8px 8px 0px 0px;
  padding: 4px;
}

.chat-container {
  position: relative;
  min-height: calc(100vh - 350px);
  max-height: calc(100vh - 300px);
  // max-height: 300px;
  /* 或固定高度 */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 10px;

  // /* 美化滚动条 */
  // scrollbar-width: thin;
  // scrollbar-color: #bbb transparent;

}

.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 3px;
}

/* 每条消息容器 */
.chat-message {
  display: flex;
  align-items: flex-start;
  width: 80%;
  // word-break: break-word;
  // white-space: pre-wrap;
}

/* 机器人消息靠左 */
.chat-message.assistant {
  flex-direction: row;
  align-self: flex-start;
}

/* 用户消息靠右 */
.chat-message.user {
  flex-direction: row-reverse;
  align-self: flex-end;
}

/* 头像样式 */
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: 0 8px;
  user-select: none;
}

/* 消息文本内容 */
.message-content {
  background-color: #e6f2ff;
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  max-width: 100%;

  /* 用户消息背景色覆盖 */
  /* 这里用更浅的灰色，文本颜色变深 */
}

.chat-message.user .message-content {
  // background-color: #f0f0f0;
  // background-color: #4f4f4f;
  background-color: #409eff;
  color: white !important;
}
</style>
