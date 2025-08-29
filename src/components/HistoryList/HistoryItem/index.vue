<template>
  <div class="custom-tree-node" :class="{ 'is-active': props.item.sessionId === chatStore.currentSessionId }">
    <span>{{ props.item.lastMessage }}</span>
    <div>
      <el-dropdown ref="dropdown1" trigger="click" style="display: flex; margin-right: 15px;">
        <el-icon color="#8c8c8c" @click.stop :size="20">
          <MoreFilled />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>编辑</el-dropdown-item>
            <el-dropdown-item>权限</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
            <!-- <el-dropdown-item disabled>Action 4</el-dropdown-item> -->
            <!-- <el-dropdown-item divided>Action 5</el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue'
import { useChatStore } from '@/store/chat';
const chatStore = useChatStore();
const props = defineProps({
  item: {
    type: Object,
    // default: () => { }
  }
})


</script>
<style scoped lang="scss">
.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  // padding: 4px 8px;
  font-size: 15px;
  color: #1f2329;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  // margin: 3px 0;

  &:hover {
    background-color: #f5f5f5;
  }

  span {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .el-button {
    padding: 0 4px;
    font-size: 16px;
    color: #6b778c;
  }
}

.is-active {
  color: #409eff;
  background-color: #e6f2ff;
  font-weight: 600;
}
</style>