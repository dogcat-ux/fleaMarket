<template>
  <div class="tabs">
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0" v-for="(item,index) in partTags" :key="index" class="tag" @click="goTag(item,index)">
        {{item.tagName}}
      </el-menu-item>
<!--      <img src="../assets/img/iconNew/more.png" alt="" class="more">-->
      <el-menu-item index="-10"  @click="tagMore" class="tag"> <img src="../assets/img/iconNew/more.png" alt="" class="more"> </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import {getAllTag} from "../api/showGoods/getAllTag";

  export default {
    name: "HomeTabs",
    components:{
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
  .tabs{
    color: #ffffff;
    margin: 0 auto;
    width: 1200px;
    height: 272px;
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
</style>
