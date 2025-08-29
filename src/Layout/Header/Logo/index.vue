<template>
  <div class="logo">
    <div class="logo-icon">
      <el-icon>
        <Fold />
      </el-icon>
    </div>
    <div class="logo-text">
      <h1>文档数字化处理系统</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Fold } from "@element-plus/icons-vue";
</script>
<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  font-size: 20px;

  .logo-icon {
    margin-right: 16px;
  }

  .logo-text {
    font-weight: bold;
  }
}
</style>