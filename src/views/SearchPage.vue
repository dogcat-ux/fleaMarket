<template>
  <div>
    <min-header></min-header>
    <div class="search-box">
    <div class="searchBar">
      <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
      </el-input>
    </div>
    <show-goods-frame :showArray="this.allGoods" :span-num="6">
      <Pagination
        :page-size="this.pageSize"
        :total="this.total"
        @currentChange="currentChange"
        @requestData="requestData"
        slot="Pagination"
      ></Pagination>
    </show-goods-frame>
  </div>
  </div>

</template>

<script>
// <!--  该页面从路由接受搜索内容-->
  import ShowGoodsFrame from "../components/ShowGoodsFrame";
  import Pagination from "../components/Pagination";
  import MinHeader from "../components/headerBar/MinHeader";
  import {unsoldGoodsCount} from "../api/showGoods/unsoldGoodsCount";
  import {searchUnsoldGoods} from "../api/showGoods/searchUnsoldGoods";

  export default {
    name: "SearchPage",
    components:{
      ShowGoodsFrame,
      Pagination,
      MinHeader
    },
    data(){
      return {
        searchContent:this.$route.query.searchContent,
        allGoods:[],
        //绑定的
        total:1,
        currPage: 1,  //默认第一页
        pageSize: 16, //默认展示10条数据
      }
    },
    methods:{
      //搜索页的搜索
      goSearch(){

      },
      //当前页
      currentChange(currPage){
        this.currPage = currPage;
      },
      //发送请求
      requestData(){
        searchUnsoldGoods(this.searchContent,this.currPage,this.pageSize).then(res=>{
          console.log(res)
          if(res.status===200){
            console.log(11111111)
              this.allGoods=[];
              for (var i = 0; i< res.data.goodsIds.length;i++){
                console.log(i)
                this.allGoods.push({
                  goodsId:res.data.goodsIds[i],
                  // sellerName:res.data.sellerNames[i],
                  sellerId:res.data.sellerIds[i],
                  goodsInfo:res.data.goodsInfos[i],
                  sellerPhone: res.data.sellerPhones[i],
                  imagePaths:res.data.imagePaths[i],
                  price:res.data.prices[i],
                  tagIds:res.data.tagIds[i],
                  // tagNames:res.data.tagNames[i],
                })
                console.log('allGoods'+this.allGoods)
                for(var t=0;t<res.data.imagePaths[i].length;t++){
                  this.allGoods[i].imagePaths[t]=this.$global.BASE_URL+this.allGoods[i].imagePaths[t]
                }
              };
              console.log('allGoods',this.allGoods);
          }
        }).catch(err=>{
          if (err.state!==200){
            console.log("请求所有商品出错")
          }
        })
      }
    },
    created() {
      //申请所有页码
      console.log(1111111)
      unsoldGoodsCount(this.searchContent,this.pageSize).then(res=>{
        console.log(222222222)
        console.log('所有页码',res)
        if(res.status===200){
          this.total = res.data.allPagesCount;
          console.log("申请搜索页总页码成功");
        }
      }).catch(err=>{
        if(err.status!==200){
          console.log("申请搜索页总页码失败");
        }
      });
      //申请内容
      this.requestData();
    },
  }
</script>

<style lang="scss" scoped>
  .search-box{
    margin: 20px auto;
    width: 1200px;
  }
</style>
