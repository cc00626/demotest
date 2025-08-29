<template>
  <el-card style="border-radius: 10px;height: 100%;">
    <template #default>
      <div class="outter-card">
        <div class="file-list">
          <FileList></FileList>
        </div>
        <div class="file-preview">
          <FilePerview></FilePerview>
        </div>
        <div class="file-edit">
          <FileEdit></FileEdit>
        </div>
      </div>
    </template>
  </el-card>
</template>
<script setup lang="ts">
import FileEdit from './FileEdit/index.vue'
import FileList from './FileList/index.vue'
import FilePerview from './FilePreview/index.vue'
</script>
<style scoped lang="scss">
.outter-card {
  display: flex;
  justify-content: space-between;

  // height: 100%;
  .file-list {
    flex: 0.4;
  }

  .file-preview {
    flex: 1;
    margin: 0px 10px;
  }

  .file-edit {
    flex: 1;
  }
}
</style>