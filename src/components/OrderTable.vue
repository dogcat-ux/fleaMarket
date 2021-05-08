<template>
  <div>
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品信息:">
              <div>{{ props.row.goodsInfo }}</div>
            </el-form-item>
            <el-form-item label="卖家名字:">
              <div @click="goUser(props.row)" class="seller">{{ props.row.sellerName }}</div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

    <el-table-column
      label="商品图片"
      width="240">
      <template slot-scope="scope">
        <el-carousel height="200px" direction="vertical" :autoplay="false">
          <el-carousel-item v-for="(item,index) in scope.row.imagePaths" :key="index" class="carousel-item">
            <!--              <h3 class="medium">{{ item }}</h3>-->
            <div class="demo-image__preview carousel-item-img">
              <el-image
                style="width: 239px; height: 200px"
                :src="item"
                :preview-src-list="scope.row.imagePaths"
                class="img-item"
              >
              </el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-table-column>

    <el-table-column
      label="商品价格"
      width="90">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.price }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="标签列表"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px"  v-for="(item,index) in scope.row.tagNames">{{item}}  </span>
      </template>
    </el-table-column>

      <slot name="edit"></slot>
      <slot name="orderDetail"></slot>
  </el-table>
  </div>
</template>

<script>
// <!--  需要传入一个列表数组-->
  export default {
    name: "OrderTable",
    props:{
      tableData:Array
    },
    methods:{
      goUser(row){
        this.$router.push({
          path:'/user/InfoForOthers',
          query:{
            userId:row.sellerId
          }
        })
      },
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
    width: 239px;
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
  }
  div.seller:hover{
    color: var(--bgc);
  }
</style>
