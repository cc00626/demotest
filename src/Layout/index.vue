<template>
  <div class="common-layout">
    <el-container>
      <el-header style="padding: 0px;height: 60px;">
        <!-- 头部 -->
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="290px">
          <!-- 侧边栏 -->
          <Menu></Menu>
        </el-aside>
        <el-main style="padding: 36px;background-color: #f3f4f6;max-height: calc(100vh - 60px);overflow: hidden;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import Logo from '../../components/Logo/index.vue'
import Tree from '../../components/Tree/index.vue'
import Menu from './Menu/index.vue'
import Header from './Header/index.vue'
import { ElContainer, ElMain, ElAside } from 'element-plus';
</script>
<style scoped lang="scss"></style>