<template>
  <div>
    <min-header></min-header>
    <div class="search-box">
      <el-tag>{{tagName}}</el-tag>
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
  import MinHeader from "../components/headerBar/MinHeader";
  import ShowGoodsFrame from "../components/ShowGoodsFrame";
  import Pagination from "../components/Pagination";
  import {cntGoodsByTag} from "../api/showGoods/cntGoodsByTag";
  import {queryGoodsByTag} from "../api/showGoods/queryGoodsByTag";

  export default {
    name: "TabsPage",
    components:{
      ShowGoodsFrame,
      Pagination,
      MinHeader
    },
    data(){
      return {
        tagId:this.$route.query.tagId,
        tagName:this.$route.query.tagName,
        allGoods:[],
        //绑定的
        total:1,
        currPage: 1,  //默认第一页
        pageSize: 8, //默认展示10条数据
      }
    },
    methods:{
      //当前页
      currentChange(currPage){
        this.currPage = currPage;
      },
      //发送请求
      requestData(){
        queryGoodsByTag(this.currPage,this.pageSize,this.tagId).then(res=>{
          console.log(res)
          if(res.status===200){
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
      cntGoodsByTag(this.pageSize,this.tagId).then(res=>{
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
