<template>
  <div>
    <el-input class="custom-input" v-model="input" placeholder="请输入文档名称"></el-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const input = ref('')
</script>

<style scoped lang="scss">
.custom-input {
  width: 750px;
  height: 60px;
  font-size: 30px;

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
    height: 60px; // 确保输入区域高度匹配
    text-align: center;
    font-size: 30px;
    font-weight: 700;

  }

  // 调整placeholder样式
  :deep(input::placeholder) {
    // 占位文字颜色
    color: black;
    // 占位文字大小（可以与输入文字不同）
    font-size: 28px;
    // 占位文字透明度
    opacity: 0.8;
    // 其他样式（如字重、间距等）
    font-weight: 700;

  }

}
</style>
