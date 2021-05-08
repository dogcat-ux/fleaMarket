<template>
  <div class="login-background">
    <min-header></min-header>
    <div class="login-page">
    <el-card class="box-card">
      <HeaderTab @loginSuccess="loginSuccess"
                 @registerSuccess="registerSuccess"
      ></HeaderTab>
<!--      <header-login @loginSuccess="loginSuccess"></header-login>-->
    </el-card>
  </div>
  </div>
</template>

<script>
  import HeaderTab from "../components/headerBar/HeaderTab";
  import MinHeader from "../components/headerBar/MinHeader";
  export default {
    name: "Login",
    components:{
      HeaderTab,
      MinHeader
    },
    methods:{
      loginSuccess(){
        if(this.$store.state.isAdmin===false){
          this.$router.replace('/');
        }else {
          this.$router.replace('/admin/AdminHome');
        }
      },
      registerSuccess(){
        this.$message.success('注册成功，请登录')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-background{
    width: 100vw;
    height: 100vh;
    background-image:url("../assets/img/bgc.jpg");
    background-position: 0 0;
    background-repeat: no-repeat;
    border: none;
  }
  .login-page{
    width: var(--view-width);
    margin: 200px auto;
    .text {
      font-size: 14px;
    }

    .item {
      padding: 18px 0;
    }

    .box-card {
      width: 480px;
      margin: auto;
    }
  }
</style>
