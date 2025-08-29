<template>
  <div class="document-card" @mouseenter="hover = true" @mouseleave="hover = false">
    <span class="title">{{ title }}</span>
    <el-dropdown trigger="click" class="dropdown-wrap" teleported="false" placement="bottom-end">
      <el-icon color="#c2c2c2" @click.stop :size="18">
        <MoreFilled />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="onEdit">编辑</el-dropdown-item>
          <el-dropdown-item @click="onPermission">权限</el-dropdown-item>
          <el-dropdown-item @click="onDelete">删除</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'
const hover = ref(false)

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'permission'): void
  (e: 'delete'): void
}>()

const onEdit = () => emit('edit')
const onPermission = () => emit('permission')
const onDelete = () => emit('delete')
</script>

<style scoped lang="scss">
.document-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  height: 32px;
  font-size: 14px;
  color: #4e5969;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f2f3f5;
  }

  .title {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropdown-wrap {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .el-icon {
    transition: color 0.2s ease;
  }

  .el-icon:hover {
    color: #333;
  }
}
</style>
