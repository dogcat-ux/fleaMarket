<template>
  <div class="pending-goods">
    <small-title :title="'审核商品'"></small-title>
    <order-table :table-data="tableData">
      <el-table-column
        label="操作"
        slot="edit">
        <template slot-scope="scope">
          <el-button @click="goodsPass(scope.$index, scope.row)" type="primary" size="small">通过</el-button>
          <el-button type="primary" size="small" @click="goodsNotPass(scope.$index, scope.row)">不通过</el-button>
        </template>
      </el-table-column>
    </order-table>
    <!--控制分页部分-->
    <div class="Pagination">
      <Pagination :page-size="this.pageSize" :total="this.total" @currentChange="currentChange" @requestData="requestData"></Pagination>
    </div>
  </div>
</template>

<script>
  import {allPendingGoodsPagesCount} from "../../api/admin/allPendingGoodsPagesCount";
  import {showAllPendingGoods} from "../../api/admin/showAllPendingGoods";
  import {pendingGoodsPass} from "../../api/admin/pendingGoodsPass";
  import {pendingGoodsNotPass} from "../../api/admin/pendingGoodsNotPass";
  import Pagination from "../Pagination";
  import OrderTable from "../OrderTable";
  import SmallTitle from "../common/SmallTitle";

  export default {
    name: "PendingGoods",
    data(){
      return {
        //图片
        tableData: [],
        total:1,
        currPage: 1,  //默认第一页
        pageSize: 4, //默认展示10条数据
      }
    },
    components:{
      Pagination,
      allPendingGoodsPagesCount,
      pendingGoodsNotPass,
      pendingGoodsPass,
      OrderTable,
      SmallTitle
    },
    methods: {
      //通过和不通过
      goodsPass(index){
        pendingGoodsPass(this.tableData[index].goodsId).then(res=>{
          console.log(res)
          if (res.status===200){
            this.$message.success("审核通过成功");
            this.tableData.splice(index,1)
          }
        }).catch(err=>{
          if (res.status!==200){
            this.$message.error("审核通过出错")
          }
        });
      },
      goodsNotPass(index){
        pendingGoodsNotPass(this.tableData[index].goodsId).then(res=>{
          console.log(res)
          if (res.status===200){
            this.$message.success("审核不通过成功");
            this.tableData.splice(index,1)
          }
        }).catch(err=>{
          if (res.status!==200){
            this.$message.error("审核不通过出错")
          }
        });;
      },
      //当前页
      currentChange(currPage){
        this.currPage = currPage;
      },
      //发送请求
      requestData(){
        showAllPendingGoods(this.currPage,this.pageSize).then(res=>{
          console.log(res)
          console.log(res.status)
          // if(res.status===200){
            this.tableData=[];
            console.log(res.data.goodsIds.length)
            for (var i = 0; i< res.data.goodsIds.length;i++){
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
              })
              for(var t=0;t<res.data.imagePaths[i].length;t++){
                this.tableData[i].imagePaths[t]=this.$global.BASE_URL+this.tableData[i].imagePaths[t]
              }
            };
          // }
        }).catch(err=>{
          if (err.status!==200){
            console.log("请求所有待审核商品出错")
          }
        })
      }
    },
    created() {
      //申请所有页码
      allPendingGoodsPagesCount(this.pageSize).then(res=>{
        console.log(1111111)
        console.log(res)
        if(res.status===200){
          this.total = res.data.allPagesCount;
          console.log("申请待审核页页数成功")
        }
      }).catch(err=>{
        if(err.status!==200){
          console.log("申请待审核页页数失败")
        }
      });
      this.requestData();
    }
  }
</script>

<style lang="scss" scoped>
  .pending-goods{
    margin: 20px auto;
    width: var(--view-width);
    text-align: center;
  }
  .pagination{
    margin: 0 auto;
  }
  .carousel{
    background-color: pink;
  }
  .carousel-item{
    text-align: center;
    background-color: #565656;
  }
  .carousel-item-img{
    background-color: #565656;
  }
  .Pagination{
    margin: 0 auto;
  }
  .el-carousel__item{
    background-color: #d3dce6;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
</style>
