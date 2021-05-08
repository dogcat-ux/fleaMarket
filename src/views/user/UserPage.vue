<template>
  <layout>
    <min-header slot="header"></min-header>
    <div slot="aside" class="aside">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <span class="title">我的信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="toUserInfo">基本资料</el-menu-item>
            <el-menu-item index="1-2" @click="upPwd">修改密码</el-menu-item>
            <el-menu-item index="1-3" @click="upEmail">修改邮箱</el-menu-item>
            <el-menu-item index="1-4" @click="toAddress">管理收货地址</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title" >
            <span class="title">我的订单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="toGoodsPurchased">买入商品</el-menu-item>
            <el-menu-item index="2-2" @click="toGoodsSelled">卖出商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title" >
            <span class="title">我的出售</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="toMyGoods">我的在售商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="5"  @click="toLike">
          <span slot="title" class="title">我的收藏</span>
        </el-menu-item>

        <el-submenu index="6">
          <template slot="title" >
            <span class="title">上传</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1" @click="addTag">上传标签</el-menu-item>
            <el-menu-item index="6-2" @click="toUpGoods">上传商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title" >
            <span class="title">账号设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="exitLogin">退出登录</el-menu-item>
            <el-menu-item index="3-2">注销</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div slot="main">
<!--      <user-info></user-info>-->
      <component :is="componentId"></component>
      <el-drawer
        title=""
        :visible.sync="drawer"
        :with-header="false">
        <div class="tag-title">添加标签</div>
        <div class="old-tag">
          <el-dropdown>
          <span class="el-dropdown-link">
            现有标签<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in options" :key="index">{{item.tagName}}</el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="add-tag">
          <el-input
            v-model="tagName"
            placeholder="请输入想要向网站添加的物品标签"
          >
          </el-input>
        </div>
        <div class="add-tag">
          <el-button style="margin-left: 10px;" size="small" type="primary" @click="addTagBtn">确认上传标签</el-button>
        </div>
      </el-drawer>
    </div>
  </layout>
</template>

<script>
  import Header from "../../components/headerBar/Header";
  import Layout from "../../components/common/Layout";
  import UserInfo from "../../components/user/UserInfo";
  import AddressManage from "../../components/user/AddressManage";
  import OrdersOfAll from "../../components/ordersAll/OrdersOfAll";
  import SoldGoodsAll from "../../components/soldGoodsAll/SoldGoodsAll";
  import MinHeader from "../../components/headerBar/MinHeader";
  import UpPwd from "../../components/user/UpPwd";
  import UpEmail from "../../components/user/UpEmail";
  import UserCollection from "../../components/user/UserCollection";
  import MyGoods from "../../components/user/MyGoods";
  import {userProfile} from "../../api/user/userProfile";
  import {getAllTag} from "../../api/showGoods/getAllTag";
  import {upTag} from "../../api/user/upTag";
  import {logout} from "../../api/user/logout";

  export default {
    name: "UserPage",
    data(){
      return{
        // openeds:
        componentId:"user-info",
        isAddTagOpen:false,
        drawer: false,
        options: [],
        tagName:''
      }
    },
    components:{
      Header,
      Layout,
      UserInfo,
      AddressManage,
      SoldGoodsAll,
      OrdersOfAll,
      MinHeader,
      UpPwd,
      UpEmail,
      UserCollection,
      MyGoods
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      backHome(){
        this.$router.replace('/')
      },
      toAddress(){
        this.componentId="AddressManage";
      },
      //买入的
      toGoodsPurchased(){
        this.componentId="OrdersOfAll";
      },
      toGoodsSelled(){
        this.componentId="SoldGoodsAll";
      },
      toUserInfo(){
        this.componentId="UserInfo";
      },
      upPwd(){
        this.componentId="UpPwd";
      },
      upEmail(){
        this.componentId="UpEmail";
      },
      toUpGoods(){
        this.$router.push('/user/UpGoods')
      },
      toLike(){
        this.componentId="UserCollection";
      },
      toMyGoods(){
        this.componentId="MyGoods";
      },
      exitLogin(){
        logout().then(res=>{
          console.log(res)
          if (res.status===200){
            if(res.data.status===200){
              sessionStorage.clear();
              this.$router.replace('/');
              location.reload();
            }else {
              this.$message.error(res.data.msg)
            }
          }else {
            this.$message.error(res.data.msg)
          }
        }).catch(err=>{
          console.log(err)
        });
        this.$router.replace('/');
      },
      addTag(){
        this.drawer = true;
        this.isAddTagOpen=true;
        getAllTag().then(res=>{
          if(res.status===200){
            for (var i=0;i<res.data.tags.length;i++){
              this.options = res.data.tags;
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      addTagBtn(){
        upTag(this.tagName).then(res=>{
          console.log(res)
          if(res.status===200){
            this.$message.success(res.data.msg)
            this.drawer = false;
            this.isAddTagOpen=false;
          }else{
            this.$message.error(res.data.msg)
          }}).catch(err=>{})
      },
    },
    created() {
      userProfile().then(res=>{
        console.log(res)
        if(res.status==200){

        }else{
        }
      }).catch(err=>{
    })
    }
  }
</script>

<style lang="scss" scoped>
  .header{
    line-height: 60px;
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
  .aside{
    height: 120vh;
  }
  .tag-title{
    margin: 30px auto;
    font-size: var(--font-title);
  }
  .old-tag{
  }
  .el-dropdown-link {
    cursor: pointer;
    color: var(--color-main);
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .add-tag{
    width: 300px;
    margin: 30px auto;
  }
</style>
