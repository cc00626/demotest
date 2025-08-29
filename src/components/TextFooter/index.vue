<template>
  <div class="content">
    <el-input v-model="firmName" placeholder="请输入公司名称" class="custom-input"></el-input>
    <el-input v-model="date" placeholder="请选择日期" class="custom-input" style="width: 200px;"></el-input>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const firmName = ref('')
const date = ref('')
</script>
<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.custom-input {
  width: 300px;

  // 确保输入框容器显示边框
  :deep(.el-input__wrapper) {
    padding: 0 12px;
    /* 恢复默认内边距，避免文字贴边 */
    border: 1px solid transparent;
    /* 显式设置边框 */
    box-shadow: none;
    /* 移除可能的阴影干扰 */

    // 聚焦状态的边框样式
    &:focus-within {
      border-color: #409eff;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
    }
  }

  // 调整输入框内文字样式
  :deep(input) {
    // height: 60px; // 确保输入区域高度匹配
    text-align: center;
    font-size: 16px;

  }

  // 调整placeholder样式
  :deep(input::placeholder) {
    // 占位文字颜色
    // 占位文字大小（可以与输入文字不同）
    font-size: 16px;
    // 占位文字透明度

  }

}
</style>