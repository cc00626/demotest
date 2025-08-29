<template>
  <div class="header">
    <div class="header-left">
      <Logo></Logo>
    </div>
    <div class="header-right">
      <Setting></Setting>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from './Logo/index.vue'
import Setting from './Setting/index.vue'
</script>
<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 36px;
}
</style>