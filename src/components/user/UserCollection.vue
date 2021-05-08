<template>
  <div class="collection">
    <order-table :table-data="tableData">
          <el-table-column label="操作" slot="edit">
            <template slot-scope="scope">
              <!--        <el-button-->
              <!--          size="mini"-->
              <!--          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
              <el-button
                size="mini"
                type="primary"
                @click="goDetail(scope.$index, scope.row)">详情页</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="buy(scope.$index, scope.row)">立即购买</el-button>
              <div class="cancelCollect">
              <el-button
                size="mini"
                type="primary"
                @click="cancelCollect(scope.$index, scope.row)">取消收藏</el-button>
              </div>
            </template>
          </el-table-column>
    </order-table>
    <div class="Pagination">
      <pagination :page-size="this.pageSize" :total="this.total" @currentChange="currentChange" @requestData="requestData"></pagination>
    </div>
  </div>
</template>

<script>
  import {cntCollectByUser} from "../../api/user/cntCollectByUser";
  import {collectOfUser} from "../../api/user/collectOfUser";
  import OrderTable from "../OrderTable";
  import Pagination from "../Pagination";
  import {pressCollect} from "../../api/user/pressCollect";

  export default {
    name: "UserCollection",
    data(){
      return{
        tableData: [],
        total:1,
        currPage: 1,  //默认第一页
        pageSize: 6, //默认展示10条数据
      }
    },
    components:{
      OrderTable,
      Pagination
    },
    methods:{
      cancelCollect(index,row){
        pressCollect(row.goodsId).then(res=>{
          console.log(res)
          if(res.status===200){
            this.$message.success(res.data.msg);
            this.tableData.splice(index,1)
          }else{
            this.$message.warning(res.data.msg)
          }
        }).catch(err=>{
        })
      },
      //购买
      buy(index, row){
        this.$router.push({
          path: '/user/PlaceOrders',
          query:  {
            goodsId:row.goodsId,
            allGoods:this.tableData
          }
        })
      },
      goDetail(index, row){
        this.$router.push({
          path: '/CommodityDetails',
          query:  {
            goodsId:row.goodsId,
          }
        })
      },
      //当前页
      currentChange(currPage){
        this.currPage = currPage;
      },
      //发送请求
      requestData(){
        collectOfUser(this.currPage,this.pageSize).then(res=>{
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
      cntCollectByUser(this.pageSize).then(res=>{
        console.log(res)
        if(res.status===200){
          this.total = res.data.allPagesCount;
        }
      }).catch(err=>{
        if(err.status!==200){
        }
      });
      this.requestData();
    }
  }
</script>

<style lang="scss" scoped>
  .collection{
    width: var(--view-width);
    margin: 20px auto;
  }
  .Pagination{
    margin: 0 auto;
  }
  .cancelCollect{
    margin-top: 5px;
  }
</style>
