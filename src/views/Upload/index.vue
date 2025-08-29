<template>
  <div class="upload">
    <ElCard class="outter-card" style="border-radius: 10px;">
      <!-- 选择文件 -->
      <ElCard style="border-radius: 10px; margin: 8px 0px;">
        <template #header>
          资源上传
        </template>
        <template #default>
          <el-upload class="upload-demo" drag action="/api/upload" :on-progress="handleProgress"
            :on-success="handleSuccess" multiple :show-file-list="false">
            <el-icon class="el-icon--upload" style="color: #409eff;margin: 4px;"><upload-filled /></el-icon>
            <h1 class="el-upload__text" style="font-size: 16px;font-weight: 500;">
              拖拽文件到此处或 <em>点击选择文件</em>
            </h1>
            <div class="el-upload__text" style="font-size: 14px;margin: 8px 0px;">
              支持Word(.doc,.docx)和PDF(.pdf)格式
            </div>
            <div class="el-upload__text">
              <ElButton type='primary'>选择文件</ElButton>
            </div>
          </el-upload>
        </template>
      </ElCard>
      <!-- 上传进度 -->
      <ElCard style="border-radius: 10px;margin: 8px 0px;" v-if="percentage > 0">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="flex: 1;">正在上传: {{ fileName }}</span>
          <el-progress :percentage="percentage" style="flex: 2;" />
        </div>
      </ElCard>
      <!-- 文件列表 -->
      <ElCard style="border-radius: 10px;margin: 8px 0px;">
        <template #header>
          <div class="file-list-header">
            <span>已上传文件</span>
            <ElButton type="danger" plain :icon="Delete" @click="clearFiles">清空列表</ElButton>
          </div>
        </template>
        <template #default>
          <div class="file-list-item" v-if="uploadedFiles.length === 0">
            <el-icon style="margin: 4px;" :size="67">
              <MessageBox />
            </el-icon>
            <span>暂无文件</span>
          </div>
          <!-- item -->
          <div v-for="(item, index) in uploadedFiles" style="margin: 16px 0px;">
            <FileCard :fileName="item.fileName" :size="item.size" :uploadTime="item.uploadTime" :key="item.id"
              :id="item.id" @deleteFile='removeFile'></FileCard>
          </div>
        </template>
      </ElCard>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { ElCard, ElButton, ElNotification } from 'element-plus';
import FileCard from '@/views/Upload/FileCard/index.vue'
import { UploadFilled, MessageBox, Delete } from '@element-plus/icons-vue'
import { ref } from "vue"
import { watch } from 'fs';
const percentage = ref(0)
const fileName = ref("")
const uploadedFiles = ref([])
//显示文件上传进度
const handleProgress = (event: any, file: any, fileList: any) => {
  percentage.value = Math.floor(event.percent)
  fileName.value = file.name

  if (event.percent === 100) {
    //提示消息
    ElNotification({
      title: 'Success',
      message: '文件上传成功',
      type: 'success',
      duration: 2000
    })
  }
}

// 上传成功后加入数组
const handleSuccess = (response: any) => {
  uploadedFiles.value.push(response)
  console.log(response)
}

// 清空列表
const clearFiles = () => {
  uploadedFiles.value = []
  percentage.value = 0
  fileName.value = ''
}

//删除单个文件
const removeFile = (id) => {
  uploadedFiles.value = uploadedFiles.value.filter((file) => file.id !== id)
  // 如果删除后没有文件了，进度条归零
  if (uploadedFiles.value.length === 0) {
    percentage.value = 0
    fileName.value = ''
  }
}

</script>

<style scoped lang="scss">
.upload {
  display: flex;

  justify-content: center;
  align-items: center;


  .outter-card {
    width: 100%;
    max-height: 600px;
    overflow-y: auto;
  }
}


.el-upload-dragger {
  padding: 20px 10px !important;
}

.file-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-list-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
