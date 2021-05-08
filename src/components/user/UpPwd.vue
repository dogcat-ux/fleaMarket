<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="通过原密码修改密码" name="first">
      <div class="form-box">
        <up-pwd-by-old></up-pwd-by-old>
      </div>
    </el-tab-pane>
    <el-tab-pane label="通过邮箱修改密码" name="second">
      <div class="form-box">
        <UpPwdByEmail></UpPwdByEmail>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import UpPwdByEmail from "../upPwdAndUpEmail/UpPwdByEmail";
  import UpPwdByOld from "../upPwdAndUpEmail/UpPwdByOld";
  export default {
    name: "UpPwd",
    data() {
      return {
        activeName: 'second'
      };
    },
    components:{
      UpPwdByOld,
      UpPwdByEmail
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  .form-box{
    width: 500px;
    height: auto;
  }
</style>
