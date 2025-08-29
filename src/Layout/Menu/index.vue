<template>
  <div class="menu-wrapper">
    <el-menu :router="true" :default-active="route.path" class="custom-menu" background-color="transparent"
      mode="vertical">
      <el-menu-item index="/upload">资源上传</el-menu-item>
      <el-menu-item index="/previewAndEdit">文件预览与编辑</el-menu-item>
      <el-menu-item index="/knowledgeBase">知识库</el-menu-item>
      <el-menu-item index="/aichat">大模型回答</el-menu-item>
      <el-menu-item index="/textGeneration">文书辅助生成</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ElMenu, ElMenuItem } from 'element-plus'
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<style scoped lang="scss">
.menu-wrapper {
  background-color: #545c64;
  box-shadow: 0 0 10px rgb(0 0 0 / 0.05);
  padding: 24px 10px;
  height: calc(100vh - 60px);
}

.custom-menu {
  border-right: none;
  background-color: transparent;

  .el-menu-item {
    padding-left: 20px !important;
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    color: #e6f2ff;
    border-left: 4px solid transparent;
    transition: all 0.3s;
    margin: 8px 0px;
    border-radius: 6px;

    &:hover {
      color: #e6f2ff;

      background-color: #409eff;
      // background-color: #1a5284;
      font-weight: 600;
    }
  }

  /* 选中样式 */
  .el-menu-item.is-active {
    color: #e6f2ff;
    // background-color: #e6f2ff;
    background-color: #409eff;
    font-weight: 600;
  }
}
</style>
