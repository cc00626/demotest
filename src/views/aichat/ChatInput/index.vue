<template>
  <div class="chat-input-box">
    <el-input type="textarea" rows="2" resize="none" placeholder="输入您的问题..." class="textarea" v-model="chatContent" />
    <el-button type="primary" @click="handleSend" class="button">{{ isStreaming ? '取消发送' : '发送' }}</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getAichatStream } from '@/api/aichat.ts'
import { useChatStore } from '../../../store/chat/index.ts'
const chatStore = useChatStore()
const chatContent = ref('')
const isStreaming = ref(false)
let controller: AbortController | null = null
//点击发送
const handleSend = async () => {

  if (isStreaming.value && controller) {
    console.log('当前处于接收流中，点击即取消')
    // 当前处于接收流中，点击即取消
    controller.abort()
    isStreaming.value = false
    return
  }

  if (chatContent.value.trim() === '') {
    alert('请输入内容')
    return
  }
  const sessionId = chatStore.generateSessionId()
  isStreaming.value = true


  // 追加当前用户输入消息
  chatStore.chatList.push({
    id: 'asd',        // 建议给消息加id
    sessionId: sessionId, // 当前会话id
    role: 'user',
    content: chatContent.value,
    timestamp: Date.now(),
  })

  // 构造上下文数组
  const messages = chatStore.chatList.filter(item => item.content.trim() !== '').map(item => ({
    role: item.role,
    content: item.content,
  }))

  chatStore.updateHistoryAfterSend({
    id: 'asd',        // 建议给消息加id
    sessionId: sessionId, // 当前会话id
    role: 'user',
    content: chatContent.value,
    timestamp: Date.now(),
  })

  chatContent.value = ''
  //发送ajax
  controller = getAichatStream({ sessionId: sessionId, messages }, {
    onMessage: (msg: any) => {
      if (chatStore.chatList[chatStore.chatList.length - 1].role === 'assistant') {
        chatStore.chatList[chatStore.chatList.length - 1].content += msg
      } else {
        chatStore.chatList.push({
          id: 'asd',        // 建议给消息加id
          sessionId: sessionId, // 当前会话id
          role: 'assistant',
          content: msg,
          timestamp: Date.now(),
        })
      }
    },
    onError: (err: any) => {
      console.error("流式错误:", err);
    },
    onClose: () => {
      chatContent.value = ''
    },
  })

}

</script>
<style scoped lang="scss">
.chat-input-box {
  border: 1px solid #3b82f6;
  border-radius: 8px;
  padding: 12px;
  min-width: 900px;
  margin: 0 auto;
  background-color: white;
  display: flex;
  align-items: center;
  // position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // bottom: 20px;
  // height: 170px;
}

.toolbar {
  margin-bottom: 8px;
}

.textarea {
  margin-bottom: 12px;
}

.button {
  height: 50px;
  margin-bottom: 10px;
}
</style>
