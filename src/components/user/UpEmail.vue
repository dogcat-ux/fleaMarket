<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="通过密码修改邮箱" name="first">
          <div class="form-box">
            <UpEmailByPwd></UpEmailByPwd>
          </div>
      </el-tab-pane>
        <el-tab-pane label="通过原邮箱修改邮箱" name="second">
          <div class="form-box">
            <UpEmailByEmail></UpEmailByEmail>
          </div>
        </el-tab-pane>
  </el-tabs>
</template>

<script>
  import UpEmailByEmail from "../upPwdAndUpEmail/UpEmailByEmail";
  import UpEmailByPwd from "../upPwdAndUpEmail/UpEmailByPwd";
  export default {
    name: "UpEmail",
    components:{
      UpEmailByEmail,
      UpEmailByPwd
    },
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-box{
    width: 500px;
    height: auto;
  }
</style>
