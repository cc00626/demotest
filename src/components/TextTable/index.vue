<template>
  <div class="form-container">
    <table class="form-table">
      <tbody>
        <tr>
          <td class="label">文档编号</td>
          <td>
            <input v-model="formData.documentNo" class="input-field" placeholder="请输入文档编号" />
          </td>
        </tr>
        <tr>
          <td class="label">时间</td>
          <td>
            <input v-model="formData.date" class="input-field" type="input" />
          </td>
        </tr>
        <tr>
          <td class="label">责任人</td>
          <td>
            <input v-model="formData.responsible" class="input-field" placeholder="请输入责任人" />
          </td>
        </tr>
        <tr>
          <td class="label">密级</td>
          <td>
            <input v-model="formData.securityLevel" class="input-field" placeholder="请输入密级" />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 如需调试可保留，不需要可删除 -->
    <div class="debug-info">
      <h4>当前表单数据：</h4>
      <pre>{{ formData }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

interface FormData {
  documentNo: string;
  date: string;
  responsible: string;
  securityLevel: string;
}

const formData = reactive<FormData>({
  documentNo: '123456',
  date: '2025-08-07',
  responsible: '',
  securityLevel: ''
});
console.log('表单数据：', formData)
</script>

<style scoped lang="scss">
// 核心调整：缩小所有元素尺寸
.form-container {
  width: 200px; // 整体宽度压缩
  margin: 20px auto; // 减少外边距
  border: 1px solid red;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1); // 弱化阴影

  // 隐藏调试信息（需要可取消注释）
  .debug-info {
    display: none;
  }
}

.form-table {
  width: 100%;
  border-collapse: collapse;

  td {
    padding: 4px 8px; // 大幅减少单元格内边距
    border: 1px solid #ddd;
    vertical-align: middle;
    font-size: 12px; // 缩小字体

    &.label {
      width: 60px; // 缩小标签宽度
      text-align: right;
      background-color: #f8f9fa;
    }
  }
}

.input-field {
  width: 100%;
  height: 100%;
  padding: 4px 6px; // 缩小输入框内边距
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 12px; // 缩小输入框字体

  &:focus {
    outline: none;
    border-color: #409eff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
  }
}
</style>