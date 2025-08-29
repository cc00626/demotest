<template>
  <el-card>
    <template #default>
      <div class="file-card">
        <div class="left">
          <div class="file-icon">
            <el-icon :size="35">
              <Files />
            </el-icon>
          </div>
          <div class="file-desc">
            <span>{{ props.fileName }}</span>
            <span class="file-desc-center">{{ size }}·{{ uploadTime }}</span>
            <el-alert title="解析成功" type="success" show-icon :closable="false" />
          </div>
        </div>
        <div class="right">
          <el-button type="primary" plain :icon="View" :bg="true" class="btn"></el-button>
          <el-button type='danger' plain :icon="Delete" :bg="true" class="btn" @click="deleteFile"></el-button>
        </div>
      </div>
    </template>
  </el-card>
</template>
<script setup lang="ts">
import { Files, View, Delete } from '@element-plus/icons-vue';
import { computed } from 'vue';
const props = defineProps(
  {
    id: {
      type: Number,
      default: 0
    },
    fileName: {
      type: String,
      default: "默认标题"
    },
    size: {
      type: Number,
      default: "默认描述"
    },
    uploadTime: {
      type: String,
      default: "默认时间"
    }
  }
)

//计算大小
const size = computed(() => {
  if (!props.size) return "0 B";
  const bytes = props.size;
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
  if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + " MB";
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
});

const uploadTime = computed(() => {
  if (!props.uploadTime) return "";
  return new Date(props.uploadTime).toLocaleString("zh-CN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // 使用12小时制，显示“上午/下午”
  });
});

//删除文件的方法
const emit = defineEmits(["deleteFile"]);
const deleteFile = () => {
  emit("deleteFile", props.id);
};
</script>
<style lang="scss">
.file-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    justify-content: space-between;

    .file-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }

    .file-desc {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .file-desc-center {
        margin: 10px 0px;
        font-weight: 350;
        color: gray;
      }

      .el-alert {
        background-color: transparent;
        padding: 0px;

        .el-alert__title {
          font-size: 12px;
        }
      }
    }
  }

  .right {
    .btn {
      width: 32px;
      height: 32px;
    }
  }
}
</style>