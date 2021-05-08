<template>
  <el-row class="header-home">
    <el-col :span="4">&nbsp;<slot name="left-content"></slot></el-col>
    <el-col :span="12">&nbsp;</el-col>
    <el-col :span="4" class="search-box">
      <search-box @toSearch="goSearchPage"></search-box>
    </el-col>
    <el-col :span="3" :offset="1" class="login-new">
      <span @click="toUserPage" v-if="this.$store.state.isLogin">
        <el-avatar :src="this.$store.state.portraitPath"></el-avatar>
      </span>
      <span @click="toLogin" v-else>登录 | 注册</span>
<!--      <span @click="toUserPage" v-else class="portrait">-->
<!--         <el-avatar :src="this.$store.state.portraitPath"></el-avatar>-->
<!--      </span>-->
    </el-col>
  </el-row>
</template>

<script>
  import SearchBox from "../common/SearchBox";
  export default {
    name: "HeaderHome",
    components:{
      SearchBox
    },
    data(){
      return{
        searchContent:'',
      }
    },
    methods:{
      goSearchPage(searchContent){
        console.log(searchContent);
        if(!searchContent){
          this.$message.error('请输入要搜索的相关信息')
        }else{
          this.$router.push({path:'/SearchPage',query:{
              searchContent:searchContent
            }})
        }
      },
      toLogin(){
        this.$router.push('/login')
      },
      toUserPage(){
        if(this.$store.state.isAdmin===true){
          this.$router.replace('/admin/AdminHome');
        }else{
          this.$router.push('/user/UserPage')
        }

      },
    },
    created() {
      console.log("登录状态",this.$store.state.isLogin)
    }
  }
</script>

<style lang="scss" scoped>
  .header-home{
    height: 60px;
    line-height: 60px;
    text-align: center;
    vertical-align: middle;
  }
  .search-img{
    width: 30px;
    height: 30px;
  }
  .search-box{
    height: 60px;
    line-height: 60px;
    margin-top: 15px;
  }
  .login-new{
    cursor: pointer;
    color: var(--color-main);
    font-size: var(--font-title);
    margin-top: 10px;
    font-family: "Chewy";
    span:hover{
      color: var(--color-sec);
    }
  }

</style>
