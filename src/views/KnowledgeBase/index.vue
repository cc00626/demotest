<template>
  <ElCard>
    <template #header>
      <span>知识库管理</span>
    </template>
    <template #default>
      <div class="konwledge-container">
        <!-- 头部 -->
        <ElCard>
          <template #default>
            <ul class="konwledge-header">
              <li>
                <span style="font-size: 13px;">查询条件</span>
                <ElInput placeholder="请输入内容" style="width: 600px;margin-top: 5px;">
                  <template #prepend>
                    <el-button :icon="Search" />
                  </template>
                </ElInput>
              </li>
              <li>
                <span style="font-size: 13px;">文档分类</span>
                <ElSelect placeholder="所有分类" style="width: 100px;margin-top: 5px;">
                  <ElOption label="分类1" value="1"></ElOption>
                  <ElOption label="分类2" value="2"></ElOption>
                  <ElOption label="分类3" value="3"></ElOption>
                </ElSelect>
              </li>
              <li>
                <span style="font-size: 13px;">查询类型</span>
                <ElSelect placeholder="模糊查询" style="width: 100px;margin-top: 5px;">
                  <ElOption label="模糊查询1" value="1"></ElOption>
                  <ElOption label="模糊查询2" value="2"></ElOption>
                  <ElOption label="模糊查询3" value="3"></ElOption>
                </ElSelect>
              </li>
              <li>
                <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 18px;">
                  <ElButton style="display: block !important;">查询</ElButton>
                  <ElButton style="display: block !important;">重置</ElButton>
                </div>
              </li>
            </ul>

          </template>
        </ElCard>
        <!-- 中间 -->
        <ElCard style="margin: 14px 0px;">
          <template #default>
            <div class="konwledge-center">
              <div class="left">
                <span>全选</span>
                <ElButton type="danger">批量删除</ElButton>
              </div>
              <div class="right">
                共 123 条数据 共 123123页
              </div>
            </div>
          </template>
        </ElCard>
        <!-- 表格 -->
        <ElCard>
          <Table></Table>
        </ElCard>
      </div>
    </template>
  </ElCard>
</template>
<script setup lang="ts">
import { ElButton, ElCard, ElSelect } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import Table from '@/views/KnowledgeBase/Table/index.vue'
</script>
<style scoped lang="scss">
.konwledge-container {
  height: 500px;
  overflow-y: auto;
}

.konwledge-header {
  display: flex;
  justify-content: space-between;

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
  }

}

.konwledge-center {
  display: flex;
  justify-content: space-between;
}
</style>