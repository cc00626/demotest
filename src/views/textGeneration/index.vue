<template>
  <el-card>
    <template #default>
      <div class="text-content">
        <div class="text-container">
          <Page>
            <Homepage></Homepage>
          </Page>
          <Page>

          </Page>
        </div>
      </div>
    </template>
  </el-card>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import Page from './Page/index.vue'
import Homepage from './Homepage/index.vue'
const router = useRouter();
const route = useRoute();

const ToDetail = () => {
  const { documentId } = route.params;
  router.push(`/${documentId}/${new Date().getTime()}`);
};
</script>
<style scoped lang="scss">
h1 {
  margin: 10px;
}

.text-content {
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  .text-container {
    width: 98%;
    max-height: 93%;
    border-radius: 10px;
    background-color: #f3f4f6;
    overflow-y: auto;
  }
}
</style>