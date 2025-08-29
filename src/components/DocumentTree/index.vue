<template>
  <el-tree :data="treeData" :props="defaultProps" node-key="id" highlight-current :default-expand-all="true"
    class="doc-tree">
    <!-- <slot></slot> -->
    <template #default="slotProps">
      <slot name="default" v-bind="slotProps"></slot>
    </template>
  </el-tree>
</template>

<script>
export default {
  name: "DocumentTree",
  props: {
    treeData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
};
</script>

<style scoped>
.doc-tree {
  max-width: 400px;
  font-size: 14px;
  user-select: none;
}

.type-tag {
  margin-left: 6px;
  color: #909399;
  font-weight: normal;
  font-size: 12px;
}
</style>
