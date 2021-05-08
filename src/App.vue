<template>
  <div id="app">
<!--    <header-bar :class="{loginPage:isloginPage}"></header-bar>-->
    <router-view></router-view>
<!--    <keep-alive>-->
<!--      <router-view>-->
<!--        &lt;!&ndash; 这里是会被缓存的视图组件，比如 page1,page2 &ndash;&gt;-->
<!--      </router-view>-->
<!--    </keep-alive>-->

  </div>
</template>

<script>
  import Home from "./views/Home";
  export default {
    name: 'App',
    components: {
      Home,
    },
    computed:{
      isloginPage(){
        return this.$route.path.indexOf('/login')!==-1 ;
      }
    },
  }
</script>

<style>
  @import "./assets/css/base.css";
  .loginPage{
    display: none;
    width: 100vw;
    height: 100vh;
    background-color: pink;
  }
</style>
