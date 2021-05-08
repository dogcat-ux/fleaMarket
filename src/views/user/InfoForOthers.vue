<template>
  <layout>
    <min-header slot="header"></min-header>
    <div slot="aside">
      <div class="portrait">
        <el-avatar :src="this.portraitPath" :size="100"></el-avatar>
      </div>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="toUserInfo">
            <i class="el-icon-document"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="2" @click="toUserSold">
            <i class="el-icon-sell"></i>
            <span slot="title">ta的出售商品</span>
          </el-menu-item>
        </el-menu>
    </div>
    <div slot="main">
      <info-others :user="user" v-if="componentId===0" class="info-main"></info-others>
      <others-sold-goods v-else></others-sold-goods>
<!--      <sold-goods-all v-else class="sold-main"></sold-goods-all>-->
    </div>
  </layout>
</template>

<script>
  import Layout from "../../components/common/Layout";
  import MinHeader from "../../components/headerBar/MinHeader";
  import InfoOthers from "../../components/infoForOthers/InfoOthers";
  // import SoldGoodsAll from "../../components/ordersAll/SoldGoodsAll";
  import {otherUserProfile} from "../../api/user/otherUserProfile";
  import OthersSoldGoods from "../../components/infoForOthers/OthersSoldGoods";

  export default {
    name: "InfoForOthers",
    components:{
      MinHeader,
      Layout,
      InfoOthers,
      OthersSoldGoods
      // SoldGoodsAll
    },
    data() {
      return {
        tabPosition: 'left',
        componentId: 0,
        portraitPath:'',
        user:[]
      };
    },
    methods:{
      toUserInfo(){
        this.componentId = 0
      },
      toUserSold(){
        this.componentId = 1
      }
    },
    created() {
      otherUserProfile(this.$route.query.userId).then(res=>{
        console.log(res)
        if(res.status===200){
          this.portraitPath = this.$global.BASE_URL + res.data.portraitPath;
          this.user=res.data.user;
        }else{
        }
      }).catch(err=>{})
    }
  }
</script>

<style lang="scss" scoped>
  .others-main{
    width: var(--width-main);
    height: 100vh;
  }
  .portrait{
    width: 150px;
    height: 100px;
    text-align: center;
    margin: 50px;
  }
  .sold-main{
    width: var(--view-width);
    margin: 20px auto;
    height: 100vh;
  }
  .info-main{
    width: 500px;
    margin: 20px auto;
    height: 100vh;
  }
</style>
