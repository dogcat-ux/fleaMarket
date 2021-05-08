<template>
  <div class="background">
    <min-header></min-header>
    <div class="all-tags">
      <small-title :title="'所有标签'"></small-title>
      <div class="tabs">
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="0" v-for="(item,index) in partTags" :key="index" class="tag" @click="goTag(item,index)">
            {{item.tagName}}
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
  import {getAllTag} from "../api/showGoods/getAllTag";
  import SmallTitle from "../components/common/SmallTitle";
  import MinHeader from "../components/headerBar/MinHeader";

  export default {
    name: "AllTags",
    components:{
      MinHeader,
      SmallTitle
    },
    data(){
      return{
        allTags:[],
        partTags:[],
      }
    },
    created() {
      getAllTag().then(res=>{
        if (res.status===200){
          this.allTags = res.data.tags;
          this.partTags = res.data.tags.slice(0,7);
        }
      }).catch(err=>{
      })
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      goTag(item,index){
        this.$router.push({
          path:'/TabsPage',
          query:{
            tagName:this.allTags[index].tagName,
            tagId:this.allTags[index].id
          }
        })
      },
      tagMore(){
        this.$router.push({
          path:'/AllTags',
          query:{
            tagName:this.allTags[0].tagName,
            tagId:this.allTags[0].id
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .background{
    width: 100vw;
    height: 100vh;
    background-image:url("../assets/img/bgc.jpg");
    background-position: 0 0;
    background-repeat: no-repeat;
    border: none;
  }
  .tabs{
    color: #ffffff;
    margin: 0 auto;
    width: 1200px;
    height: auto;
    line-height: 272px;
    /*background-color: pink;*/
    border-radius: 20px;
    box-shadow: #e0dddd;
    vertical-align: middle;
    .tag{
      display: inline-block;
      margin: 20px;
      img{
        width: 20px;
        height: 20px;
      }
    }
    .more{
      width: 30px;
      height: 30px;
      margin-top: 10px;
    }
  }
  .all-tags{
    width: var(--width-main);
    height: auto;
    margin: 0 auto;
  }
</style>
