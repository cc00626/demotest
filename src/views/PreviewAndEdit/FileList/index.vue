<template>
  <div class="file-list">
    <span>文件列表</span>
    <!-- 搜索框 -->
    <div class="search-box">
      <el-input v-model="input" style="width: 220px" placeholder="搜索文件..." />
      <el-button type="primary" :icon="Search" plain style="width: 21.6px;"></el-button>
    </div>
    <!-- 文件列表 -->
    <div v-for="(item, index) in editStore.fileList" :key="index" class="file-list-card">
      <ListCard :item="item"></ListCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue';
import ListCard from './ListCard/index.vue'
import useEditStore from '@/store/edit'
const input = ref('')
const editStore = useEditStore()
onMounted(async () => {
  await editStore.getFileListToStore()
})
</script>
<style scoped lang="scss">
.file-list {
  width: 100%;

  .search-box {
    display: flex;
    justify-content: flex-start;
    margin: 12px 0px;
  }

  .file-list-card {
    margin: 10px 0px;
  }
}
</style>