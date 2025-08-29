<template>
  <el-container class="chat-page">
    <!-- 侧边栏 -->
    <el-aside width="220px" class="sidebar">
      <Sidebar />
    </el-aside>
    <!-- 主体 -->
    <el-container>
      <el-main class="chat-main" style="overflow: hidden;">
        <!-- 会话区域 -->
        <div class="chat-welcome">
          <ChatContent></ChatContent>
        </div>
        <!-- 输入区域 -->
        <ChatInput />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Sidebar from './Sidebar/index.vue'
import ChatHeader from './ChatHeader/index.vue'
import ChatInput from './ChatInput/index.vue'
import ChatContent from './ChatContent/index.vue'
</script>

<style scoped lang="scss">
.chat-page {
  height: 100%;
}

.sidebar {
  background: white;
  border-right: 1px solid #e0e0e0;
}

.chat-header {
  padding: 16px;
  background-color: white;
  border-bottom: 1px solid #f0f0f0;
}

.chat-main {
  padding: 12px;
  overflow: auto;
  background-color: #fff;
}

.logo {
  font-weight: bold;
  color: #3b82f6;
}
</style>
