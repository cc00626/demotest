<template>
  <div class="setting">
    <div>
      <el-icon>
        <Bell />
      </el-icon>
    </div>
    <div>
      <el-icon>
        <Setting />
      </el-icon>
    </div>
    <div class="user-info">
      <img src="../../../../../src/assets/vibrent_5.png" alt="">
      <span>管理员</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Setting, Bell } from "@element-plus/icons-vue";
</script>
<style scoped lang="scss">
.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  width: 180px;

  .user-info {
    display: flex;
    align-items: center;

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 4px;
    }
  }
}
</style>