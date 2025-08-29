<template>
  <div class="page-container">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.page-container {
  /* A4纸标准尺寸：210mm × 297mm */
  width: 793px;
  /* 210mm × 3.78px/mm */
  height: 1122px;
  /* 297mm × 3.78px/mm */

  /* 增加真实纸张质感 */
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* 纸张阴影 */
  margin: 20px auto;
  /* 居中显示 */
  padding: 40px;
  /* 页边距 */
  box-sizing: border-box;
  /* 确保padding不影响整体尺寸 */
  position: relative;
}
</style>