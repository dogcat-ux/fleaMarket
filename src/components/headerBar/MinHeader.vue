<template>
  <div class="header">
    <Header class="user-header">
        <span slot="leftBox" @click="backHome">
          <img src="../../assets/img/iconNew/back.png" alt="" class="back-img">
          返回首页
        </span>
      <span slot="rightBox" >
        <el-avatar @click="toUserPage"
                   v-if="this.$store.state.isLogin"
                   :src="this.$store.state.portraitPath" ></el-avatar>
        <span @click="toLogin" v-else>登录 | 注册</span>
      </span>
    </Header>
  </div>
</template>

<script>
  import Header from "./Header";
  export default {
    name: "MinHeader",
    components:{
      Header
    },
    methods:{
      backHome(){
        this.$router.replace('/')
      },
      toLogin(){
        this.$router.push('/login')
      },
      toUserPage(){
        if(this.$store.state.isAdmin===true){
          this.$router.replace('/admin/AdminHome');
        }else{
          this.$router.replace('/user/UserPage')
        }

      },
    }
  }
</script>

<style lang="scss" scoped>
  .header{
    line-height: 60px;
    width: 100vw;
    height: 60px;
  }
  .profile-img{
    margin-top: 10px;
    cursor: pointer;
  }
  .user-header{
    height: 60px;
    line-height: 60px;
    span{
      cursor: pointer;
    }
    span:hover{
      color: var(--hover-color-text);
    }
  }
  .back-img {
    width: 20px;
    height: 20px;
  }

  .title{
    font-size: var(--font-title);
    border-bottom: 3px solid var(--bgc) ;
  }
</style>
