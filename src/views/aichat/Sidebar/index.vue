<template>

  <div class="sidebar-wrapper">
    <div class="title">
      <span>聊天记录</span>
      <el-button type="danger" :icon="Delete" plain size="small"></el-button>
    </div>
    <!-- <el-button type="primary" plain icon="Plus" class="new-btn" block @click="newChat">+ 新对话</el-button> -->
    <div class="history-list">
      <!-- <div class="history-title">历史记录</div> -->
      <div class="empty-chat">
        <el-icon :size="60">
          <ChatDotRound />
        </el-icon>
        <span>暂无聊天记录</span>
      </div>
      <!-- <HistoryList :data="chatStore.historyList" v-else></HistoryList> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import HistoryList from '../../../components/HistoryList/index.vue'
import { useChatStore } from '@/store/chat'
import { Delete, Plus, ChatDotRound } from '@element-plus/icons-vue'
const chatStore = useChatStore()
//添加新对话
// const newChat = () => {
//   //清空当前的聊天记录
//   chatStore.clearChatList()
// }

onMounted(async () => {
  await chatStore.getHistory()
})
</script>

<style scoped lang="scss">
.sidebar-wrapper {
  padding: 12px;
}

.new-btn {
  text-align: center;
  margin-bottom: 20px;
}

.history-title {
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
}

.el-menu-item {
  font-size: 14px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f4f6;
  width: 100%;
  padding: 8px;
  border-radius: 12px 12px 0 0;
  margin-bottom: 4px;

  span {
    font-size: 14px;
  }
}

.history-list {
  .empty-chat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 20px;
  }
}
</style>
