<template>
  <div class="login">
    <div class="bac-img"><img src="../../assets/W020250719550205074043_r75.png" class="img"></img></div>
    <div class="login-container">
      <h1>内部统一登录门户</h1>
      <ElForm>

        <!-- ElInput -->
        <ElFormItem>
          <ElInput placeholder="请输入用户名" v-model="username" type="text"></ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElInput placeholder="请输入密码" v-model="password" type="password"></ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElButton @click="submit">登录</ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElForm, ElInput, ElButton, ElFormItem } from 'element-plus'
import { ref } from 'vue';
import router from '../../router';

const username = ref('')
const password = ref()
// 登录
const submit = () => {
  router.push('/')
  // alert('登录成功')
}

</script>
<style scoped lang="scss">
.login {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: url(../../assets/W020250719550205074043_r75.png) no-repeat;
  background-size: 40% auto;
  background-position: left;
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
  display: flex;
  justify-content: right;
  align-items: center;

  .login-container .el-form {
    width: 800px;
    height: 180px;
    // background-color: green;
    // margin-right: 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }

}

.login-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  // align-items: center;
  h1 {
    text-align: center;
    margin-bottom: 60px;
    font-size: 30px;
    font-weight: bold;
  }
}

.bac-img {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  .img {
    margin-left: 200px;
    width: 100%;
    // height: %;
    // position: absolute;
    // left: 0;
    // top: auto;
  }


}
</style>