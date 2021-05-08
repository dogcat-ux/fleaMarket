<template>
  <div class="all-goods">
    <small-title :title="'查看所有未出售商品'"></small-title>
    <show-goods-frame :showArray="this.allGoods" :span-num="8">
      <Pagination
        :page-size="this.pageSize"
        :total="this.total"
        @currentChange="currentChange"
        @requestData="requestData"
        slot="Pagination"
      ></Pagination>
    </show-goods-frame>
  </div>
</template>

<script>
  import {showAllUnsoldGoods} from "../../api/showGoods/showAllUnsoldGoods";
  import {allUnsoldGoodsPagesCount} from "../../api/showGoods/allUnsoldGoodsPagesCount";
  import ShowGoodsFrame from "../ShowGoodsFrame";
  import Pagination from "../Pagination";
  import SmallTitle from "../common/SmallTitle";

  export default {
    name: "AllUnsoldGoods",
    components:{
      //函数
      showAllUnsoldGoods,
      //组件
      ShowGoodsFrame,
      Pagination,
      SmallTitle
    },
    data(){
      return {
        allGoods:[
        ],
        //绑定的
        total:1,
        currPage: 1,  //默认第一页
        pageSize: 6, //默认展示10条数据
      }
    },
    methods:{
      //当前页
      currentChange(currPage){
        this.currPage = currPage;
        console.log("现在admin/所有商品",this.currPage)
      },
      //发送请求
      requestData(){
        showAllUnsoldGoods(this.currPage,this.pageSize).then(res=>{
          console.log(res)
          if(res.status===200){
            console.log(11111111)
            for (var i = 0; i< res.data.goodsIds.length;i++){
              console.log(res.status)
              // if(res.status===200){
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
      allUnsoldGoodsPagesCount(this.pageSize).then(res=>{
        console.log(res)
        if(res.status===200){
          this.total = res.data.allPagesCount;
          console.log("申请所有商品页面成功");
        }
      }).catch(err=>{
        if(err.status!==200){
          console.log("申请待审核页失败");
        }
      });
      this.requestData();
    },
  }
</script>

<style lang="scss" scoped>
  .all-goods{
    margin: 20px auto;
    width: var(--view-width);
  }
  .pagination{
    margin: 0 auto;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
