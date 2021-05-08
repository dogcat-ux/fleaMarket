<template>
  <div>
    <small-title :title="'买入的商品'"></small-title>
    <all-orders-table :table-data="tableData" @goDetailInTable="goDetailInTable">
      <el-button
        slot="operation"
        size="mini"
        type="primary">
        详情页
      </el-button>
    </all-orders-table>
    <pagination :total="total" :page-size="pageSize" @requestData="requestData" @currentChange="currChange" class="pagination"></pagination>
  </div>
</template>

<script>
  import AllOrdersTable from "./AllOrdersTable";
  import {cntOrderByBuyerId} from "../../api/user/cntOrderByBuyerId";
  import {queryOrderByBuyerId} from "../../api/user/queryOrderByBuyerId";
  import Pagination from "../Pagination";
  import SmallTitle from "../common/SmallTitle";

  export default {
    name: "OrdersOfAll",
    components:{
      Pagination,
      AllOrdersTable,
      SmallTitle
    },
    data(){
      return{
        tableData:[],
        total:1,
        pageSize:3,
        currentPage:1,
      }
    },
    methods:{
      currChange(currentPage){
        this.currentPage = currentPage;
      },
      requestData(){
      //  请求后端数据
        queryOrderByBuyerId(this.currentPage,this.pageSize).then(res=>{
          console.log("queryOrderByBuyerId",res);
          if(res.status===200){
            this.tableData=[];
            for(var i = 0;i < res.data.goodsIds.length;i++){
              this.tableData.push({
                goodsId: res.data.goodsIds[i],
                orderId: res.data.orderIds[i],
                sellerName: res.data.sellerNames[i],
                sellerId: res.data.sellerIds[i],
                goodsInfo: res.data.goodsInfos[i],
                imagePath: this.$global.BASE_URL+res.data.imagePaths[i],
                deliveryTime: res.data.deliveryTimes[i],
                addressId: res.data.addressIds[i],
                price: res.data.prices[i],
                evaluation: res.data.evaluations[i],
                isReceived: res.data.isReceiveds[i],
              })
            }
          }
        }).catch(err=>{
          console.log(err)
          if(res.status!==200){
          }
        })
      },
      goDetailInTable(index){
        this.$router.push({
          path:"/user/OrderDetail",
          query:{
            tableData:this.tableData[index],
            goodsId:this.tableData[index].goodsId
          }
        })
      }
    },
    created() {
      //计算页数
      cntOrderByBuyerId(this.pageSize).then(res=>{
        console.log("cntOrderByBuyerId",res)
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
