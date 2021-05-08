<template>
  <div class="admin-home">
    <div class="aside-bar">
      <div class="web-name">易物 YIWU</div>
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="6">
          <span slot="title" class="user-img">
            <el-avatar :src="this.$store.state.portraitPath"></el-avatar>
          </span>
        </el-menu-item>
        <el-menu-item index="5" @click="toHome">
          <span slot="title">
            <i class="el-icon-s-home"></i>
            <span>回到网站首页</span>
          </span>
        </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <span>审核</span>
            </template>
              <el-menu-item index="1-1" @click="pendGoods">审核商品</el-menu-item>
              <el-menu-item index="1-2" @click="pendingTags">审核标签</el-menu-item>
          </el-submenu>
          <el-menu-item index="2"  @click="adminUser">
            <i class="el-icon-user"></i>
            <span slot="title">管理用户账户</span>
          </el-menu-item>
          <el-menu-item index="3" @click="allUnsoldGoods">
            <i class="el-icon-document"></i>
            <span slot="title" >查看所有未出售商品</span>
          </el-menu-item>
        <el-menu-item index="4" @click="addTag">
          <i class="el-icon-edit"></i>
          <span slot="title" >上传标签</span>
          </el-menu-item>
          <el-menu-item index="5"  @click="exitLogin">
            <i class="el-icon-setting"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
    </div>
    <div class="content">
      <div class="main">
        <component :is="componentId" class="component"></component>
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
              placeholder="请输入想要向网站添加的物品标签">
            </el-input>
          </div>
          <div class="add-tag">
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="addTagBtn">确认上传标签</el-button>
          </div>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
  import PendingGoods from "../../components/admin/PendingGoods";
  import AllUnsoldGoods from "../../components/admin/AllUnsoldGoods";
  import AdminUser from "../../components/admin/AdminUser";
  import PendingTags from "../../components/admin/PendingTags";
  import {getAllTag} from "../../api/showGoods/getAllTag";
  import {upTag} from "../../api/user/upTag";
  import {logout} from "../../api/user/logout";
  export default {
    name: "AdminHome",
    components:{
      PendingGoods,
      AllUnsoldGoods,
      AdminUser,
      PendingTags
    },
    data(){
      return{
        componentId:'PendingGoods',
        isAddTagOpen:false,
        drawer: false,
        options: [],
        tagName:''
      }
    },
    methods: {
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
      exitLogin(){
        sessionStorage.clear();
        location.reload();
        this.$router.replace('/')
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      pendGoods(){
        this.componentId = "PendingGoods";
      },
      allUnsoldGoods(){
        this.componentId = "AllUnsoldGoods";
      },
      adminUser(){
        this.componentId = "AdminUser";
      },
      pendingTags(){
        this.componentId = "PendingTags";
      },
      toHome(){
        this.$router.replace('/');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .admin-home{
    display: flex;
    width: 100vw;
    height: auto;
    justify-items: center;
    /*background-color: var(--bgc);*/
    /*height: 100vh;*/
    .aside-bar{
      height: 100vh;
      background-color: #FFFFFF;
      width: var(--width-admin-asideh);
      /*height: 100vh;*/
      .web-name{
        font-family: "DingYongKang";
        margin: 20px 30px;
        color: var(--color-main);
        font-size: 20px;
      }
      .user-img{
        margin: 40px;
      }
    }
    .content{
      flex: 1;
      width: auto;
      height: auto;
      background: repeating-linear-gradient(to right,var(--bgc),var(--color-bgc2));
      border-radius: 80px 0px 0px 0px;
      text-align: center;
      /*position: relative;*/
      .main{
        width: var(--view-width);
        height: auto !important;
        /*background-color: moccasin;*/
        margin: 50px auto;
        /*background-color: #fff;*/
        /*position: absolute;*/
        /*top: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        /*left: 0;*/
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
    }
  }
  .el-menu {
    border-right: 0;
  }
</style>
