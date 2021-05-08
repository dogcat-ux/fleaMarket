<template>
  <div>
    <small-title :title="'ta已经卖出的商品'"></small-title>
    <others-sold-goods-table :table-data="tableData"></others-sold-goods-table>
    <pagination :total="total" :page-size="pageSize" @requestData="requestData" @currentChange="currChange" class="pagination"></pagination>
  </div>
</template>

<script>
  import {cntOrderBySellerId} from "../../api/user/cntOrderBySellerId";
  import {queryOrderBySellerId} from "../../api/user/queryOrderBySellerId";
  import Pagination from "../Pagination";
  import SmallTitle from "../common/SmallTitle";
  import OthersSoldGoodsTable from "./OthersSoldGoodsTable";
  // queryOrderBySellerId
  export default {
    name: "SoldGoodsAll",
    components:{
      Pagination,
      SmallTitle,
      OthersSoldGoodsTable
    },
    data(){
      return{
        tableData:[],
        total:1,
        pageSize:10,
        currentPage:1,
      }
    },
    computed:{
    },
    methods:{
      currChange(currentPage){
        this.currentPage = currentPage;
      },
      requestData(){
        //  请求后端数据
        queryOrderBySellerId(this.currentPage,this.pageSize).then(res=>{
          console.log("queryOrderBySellerId",res);
          if(res.status===200){
            this.tableData=[];
            console.log(res.data.goodsIds.length)
            for (var i = 0; i< res.data.goodsIds.length;i++){
              this.tableData.push({
                orderId:res.data.orderIds[i],
                goodsId:res.data.goodsIds[i],
                buyerName:res.data.buyerNames[i],
                buyerId:res.data.buyerIds[i],
                goodsInfo:res.data.goodsInfos[i],
                imagePath:this.$global.BASE_URL+res.data.imagePaths[i],
                price:res.data.prices[i],
                isReceived:res.data.isReceiveds[i],
                deliveryTime:res.data.deliveryTimes[i],
                evaluation:res.data.evaluations[i],
              })
            }
          }
        }).catch(err=>{
          console.log(err)
          if(err.status!==200){
          }
        });
      },
      goDetailInTable(index){
        this.$router.push({
          path:"/user/OrderSoldDetail",
          query:{
            tableData:this.tableData[index],
            goodsId:this.tableData[index].goodsId
          }
        })
      }
    },
    created() {
      cntOrderBySellerId(this.pageSize).then(res=>{
        console.log("cntOrderBySellerId",res)
        if (res.status===200){
          this.total = res.data.allPagesCount;
        }
      }).catch(err=>{
        console.log(err)
      })
      //  请求函数
      this.requestData();
    },
  }
</script>

<style scoped>
  .pagination{
    margin: 0 auto;
  }
</style>
