<template>
  <!-- 表头文件 -->
  <div class="text-table">
    <TextTable></TextTable>
  </div>
  <div class="text-title">
    <TextTitle></TextTitle>
  </div>
  <div class="text-footer">
    <TextFooter></TextFooter>
  </div>
</template>
<script setup lang="ts">
import TextTable from '@/components/TextTable/index.vue'
import TextTitle from '@/components/TextTitle/index.vue'
import TextFooter from '@/components/TextFooter/index.vue'
</script>
<style scoped lang="scss">
.text-table {
  position: absolute;
  top: 10px;
  right: 30px;
}

.text-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.text-footer {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>