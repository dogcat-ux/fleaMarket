<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品信息">
              <span>{{ props.row.goodsInfo}}</span>
            </el-form-item>
            <el-form-item label="买家名字">
              <span @click="goUser(props.row)" class="seller">{{ props.row.buyerName}}</span>
            </el-form-item>
            <el-form-item label="该商品收到的评分(买家还未收货则显示0)">
              <div>
                <el-rate v-model="props.row.evaluation"
                         disabled
                         show-score
                         text-color="#ff9900">
                </el-rate>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!--    第一列-->
      <el-table-column
        label="商品图片"
        width="240">
        <template slot-scope="scope">
          <el-image
            class="img-item"
            style="width: 240px; height: 200px"
            :src="scope.row.imagePath">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column
        label="商品价格"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">￥{{ scope.row.price}}</span>
        </template>
      </el-table-column>
      <!--     第六列-->
      <el-table-column
        label="配送时间">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>时间: {{ scope.row.deliveryTime }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">
                <i class="el-icon-time"></i>
                {{ scope.row.deliveryTime.slice(0,10)}}
              </el-tag>
              <el-tag size="medium">
                {{ scope.row.deliveryTime.slice(11)}}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="收货状态">
        <template slot-scope="scope">
          <span v-if="scope.row.isReceived===true">对方已确定收货</span>
          <span v-else>对方还未确定收货</span>
        </template>
      </el-table-column>
      <!--      最后一列-->
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button slot="operation"
                     @click="goDetailInTable(scope.$index)"
                     type="primary"
                     size="mini">详情页
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  // <!--  需要传入一个列表数组-->
  //传出了详情页跳转点击事件
  import {upOrderIsReceived} from "../../api/user/upOrderIsReceived";

  export default {
    name: "SoldGoodsAllTable",
    props:{
      tableData:Array,
      nowIndex:'',
      nowRow:'',
      value:5
    },
    data(){
      return{
        rateValue:null,
        dialogVisible: false,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      }
    },
    methods:{
      goDetailInTable(index){
        this.$router.push({
          path:"/user/OrderSoldDetail",
          query:{
            tableData:this.tableData[index],
            goodsId:this.tableData[index].goodsId
          }
        })
      },
      toReceive(index,row){
        this.nowIndex = index;
        this.nowRow = row;
        this.dialogVisible = true;
      },
      goUser(row){
        this.$router.push({
          path:'/user/InfoForOthers',
          query:{
            userId:row.buyerId
          }
        })
      },
      affirmReceive(){
        if (!this.rateValue){
          this.$message.error('请先评分')
        }else {
          upOrderIsReceived(this.rateValue,this.nowRow.orderId).then(res=>{
            console.log(res)
            if(res.status===200){
              if (res.data.status===200){
                this.$message.success(res.data.msg);
                this.dialogVisible = false;
              }else {
                this.$message.error(res.data.msg);
                this.dialogVisible = false;
              }
            }else{
            }
          }).catch(err=>{})
        }
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .img-item{
    margin: 0 auto;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    width: 240px;
    height: 200px;
  }
  /deep/ img{
    width:100%;
    height: 100%;
    object-fit:cover;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .seller{
    border-bottom: 1px solid var(--color-main);
    cursor: pointer;
  }
</style>
