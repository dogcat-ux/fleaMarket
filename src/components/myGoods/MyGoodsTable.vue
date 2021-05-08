<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品信息">
            <span>{{ props.row.goodsInfo}}</span>
          </el-form-item>
          <el-form-item label="商品标签">
            <el-tag v-for="(item, index) in props.row.tagNames" :key="index">{{item}}</el-tag>
          </el-form-item>
          <el-form-item label="商品价格">
            <span>{{ props.row.price}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品">
      <template slot-scope="scope">
        <div class="carousel">
         <el-carousel height="200px" direction="vertical" :autoplay="true"ndicator-position="outside" :interval="5000">
          <el-carousel-item v-for="(item,index) in scope.row.imagePaths" :key="index" class="carousel-item" >
            <div class="demo-image__preview carousel-item-img">
              <el-image
                style="width: 298px; height: 200px"
                :src="item"
                :preview-src-list="scope.row.imagePaths"
                class="img-item"
              >
              </el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="审核状态"
      prop="pendingStatus">
    </el-table-column>
    <el-table-column
      label="操作"
      prop="desc">
      <template slot-scope="scope">
        <el-button @click="upNew(scope.row)" type="primary" size="mini">重新上传</el-button>
        <el-popconfirm
          title="确定删除吗？"
          @confirm="handleDelete(scope.$index,scope.row)"
        >
          <el-button size="mini" type="primary" slot="reference">删除</el-button>
        </el-popconfirm>
        <el-button @click="toDetail(scope.$index,scope.row)" size="mini" type="primary" v-if="scope.row.pendingStatus==='在售'">
          商品详情页
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

  import {deleteOnSaleGoods} from "../../api/user/deleteOnSaleGoods";

  export default {
    name: "MyGoodsTable",
    props:{
      tableData:Array
    },
    methods:{
      upNew(){
        this.$router.push('/user/UpGoods')
      },
      handleDelete(index,row){
        deleteOnSaleGoods(row.goodsId).then(res=>{
          console.log(res)
          if(res.status===200){
            if (res.data.status===200){
              this.$message.success(res.data.msg);
              this.tableData.splice(index,1);
            }else {
              this.$message.error(res.data.msg);
              // this.tableData.splice(index,1);
            }
          }else{
          }
        }).catch(err=>{})
      },
      toDetail(index,row){
        this.$router.push({
          path:'/CommodityDetails',
          query:{
            goodsId:row.goodsId
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
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
  .carousel{
    text-align: center;
  }
  .img-item{
    margin: 0 auto;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    width: 297.6px;
    height: 200px;
  }
  /deep/ img{
    width:100%;
    height: 100%;
    object-fit:cover;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0 auto;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: var(--bgc);
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: var(--bgc);
  }
</style>
