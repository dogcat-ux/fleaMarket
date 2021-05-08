<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="密码登录" name="first">
        <header-login @loginSuccess="loginSuccess"></header-login>
        <el-link type="primary" :underline="false" @click="findPwd" >找回密码</el-link>
      </el-tab-pane>
      <!--    <el-tab-pane label="验证码登录" name="second">-->
      <!--      <header-code-login></header-code-login>-->
      <!--    </el-tab-pane>-->
      <el-tab-pane label="注册" name="third">
        <header-register @registerSuccess="registerSuccess"></header-register>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="找回密码"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <find-pwd @findPwdSuccess="findPwdSuccess"></find-pwd>
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  </span>
    </el-dialog>
  </div>
</template>

<script>
// <!--  发射了注册成功和登录成功事件-->
  import HeaderCodeLogin from "./HeaderCodeLogin";
  import HeaderLogin from "../login/HeaderLogin";
  import HeaderRegister from "../login/HeaderRegister";
  import FindPwd from "../login/FindPwd";
  export default {
    name: "HeaderTab",
    components:{
      HeaderLogin,
      HeaderRegister,
      HeaderCodeLogin,
      FindPwd
    },
    data() {
      return {
        activeName: 'first',
        dialogVisible: false
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      loginSuccess(){
        this.$emit('loginSuccess')
      },
      registerSuccess(){
        this.$emit('registerSuccess')
      },
      handleClose(done) {
        done();
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
      },
      findPwd(){
        this.dialogVisible = true;
      },
      findPwdSuccess(){
        this.dialogVisible = false;
      }
    }
  }
</script>

<style scoped>

</style>
