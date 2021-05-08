<template>
  <div class="my-goods">
    <div class="my-goods-main">
      <my-goods-table :table-data="goodsOnsale"></my-goods-table>
    </div>
    <div class="Pagination">
      <Pagination :page-size="pageSize" :total="total" @currentChange="currentChange" @requestData="requestData"></Pagination>
    </div>
  </div>
</template>

<script>
  import Pagination from "../Pagination";
  import MyGoodsTable from "../myGoods/MyGoodsTable";
  import {queryAllGoods} from "../../api/user/queryAllGoods";
  import {allGoodsCount} from "../../api/user/allGoodsCount";
  export default {
    name: "MyGoods",
    components:{
      Pagination,
      MyGoodsTable
    },
    data(){
      return{
        pageSize:3,
        total:0,
        currPage:1,
        tableData:[],
        goodsOnsale:[]
      }
    },
    methods:{
      //当前页
      currentChange(currPage){
        this.currPage = currPage;
      },
      //发送请求
      requestData(){
        queryAllGoods(this.currPage,this.pageSize).then(res=>{
          console.log(res)
          console.log(res.status)
          if(res.status===200){
            this.tableData=[];
            console.log(res.data.goodsIds.length)
            for (var i = 0; i< res.data.goodsIds.length;i++){
            var pendingStatus = ""
            if(res.data.pendingStatusList[i]===2){
              pendingStatus = "审核不通过"
            }else if (res.data.pendingStatusList[i]===0){
              pendingStatus = "审核中"
            }else if (res.data.pendingStatusList[i]===1){
              if (res.data.isOnSales[i]===true){
                pendingStatus = "在售"
              }else {
                pendingStatus = "已卖出"
              }
            }

            this.tableData.push({
              goodsId:res.data.goodsIds[i],
              sellerName:res.data.sellerNames[i],
              sellerId:res.data.sellerIds[i],
              goodsInfo:res.data.goodsInfos[i],
              sellerPhone: res.data.sellerPhones[i],
              imagePaths:res.data.imagePaths[i],
              price:res.data.prices[i],
              tagIds:res.data.tagIds[i],
              tagNames:res.data.tagNames[i],
              isOnSale:res.data.isOnSales[i],
              pendingStatus:pendingStatus,
            })
            for(var t=0;t<res.data.imagePaths[i].length;t++){
              this.tableData[i].imagePaths[t]=this.$global.BASE_URL+this.tableData[i].imagePaths[t]
            }}
            this.goodsOnsale = this.tableData.filter((value,index,arr)=>{
              return value.pendingStatus==='在售'||value.pendingStatus==='审核中'||value.pendingStatus==='审核不通过'
              // return value.isOnSale === true
            })
          }
          // }
        }).catch(err=>{
          if (err.status!==200){
          }
        })
      }
    },
    created() {
      //总页数
      allGoodsCount(this.pageSize).then(res=>{
        console.log(res)
        if(res.status===200){
          this.total = res.data.allPagesCount;
        }
      }).catch(err=>{})
      //请求
      this.requestData();
    }
  }
</script>

<style scoped>

</style>
