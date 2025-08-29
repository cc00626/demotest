<template>
  <div>
    <div class="file-list-card" :class="{ active: editStore.selectedId === props.item.id }"
      @click="selectItem(props.item)">
      <div class="file-list-card-content">
        <span>{{ props.item.fileName }} </span>
        <span>{{ uploadTime }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFileInfo } from '@/utils/useFileInfo';
import useEditStore from '@/store/edit/index'
const props = defineProps({
  item: {
    type: Object
  },
})
const editStore = useEditStore()
const { uploadTime } = useFileInfo({ uploadTime: props.item.uploadTime });


const selectItem = (item) => {
  editStore.selectedId = item.id
}
</script>
<style scoped lang="scss">
.file-list-card {
  width: 90%;
  height: 48px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  margin-bottom: 8px;
  background-color: #fff;

  &:hover {
    background-color: #f0f6ff; // Element Plus 浅蓝色风格
    border-left: 4px solid #409eff; // Element Plus 主色蓝
  }

  .file-list-card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    span:first-child {
      flex: 1; // 占满剩余空间
      font-size: 14px;
      max-width: 140px; // 限制宽度
      white-space: nowrap; // 不换行
      overflow: hidden; // 超出隐藏
      text-overflow: ellipsis; // 显示省略号
    }

    span:last-child {
      flex-shrink: 0; // 不缩小
      color: gray;
      font-size: 12px;
      max-width: 120px; // 限制宽度，防止超出
      white-space: wrap;
      margin-left: 12px; // 和文件名保持间距
    }
  }
}

.active {
  background-color: #f0f6ff; // Element Plus 浅蓝色风格
  border-left: 4px solid #409eff; // Element Plus 主色蓝
}
</style>