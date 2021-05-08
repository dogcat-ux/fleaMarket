<template>
  <div>
    <el-carousel
    indicator-position="outside"
    :interval="5000"
    height="300px"
    width="365px"
    ref="carousel"
  >
    <el-carousel-item v-for="(item,index) in showArray" :key="index" name="index">
      <div class="demo-image__preview">
        <el-image
          style="width: 500px; height: 500px"
          :src="item"
          :preview-src-list="showArray"
        >
        </el-image>
      </div>
    </el-carousel-item>
  </el-carousel>
    <div class="min-look">
      <img src="../../assets/img/iconNew/left.png" alt="" class="icon-img">
      <div class="min-look-main">
        <div class="min-img-item" v-for="(item,index) in showArray">
          <el-image
            style="width: 70px; height: 70px"
            :src="item"
            @click="activeImg(item,index)">
          </el-image>
        </div>
      </div>
      <img src="../../assets/img/iconNew/right.png" alt=""  class="icon-img">
    </div>
  </div>

</template>

<script>
  export default {
    name: 'CommoditySwiper',
    props:{
      showArray:Array
    },
    methods:{
      activeImg(item,index){
        console.log(index)
        this.setActiveItem(index);
      },
      setActiveItem(index){
        this.$refs.carousel.setActiveItem(index);
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
    width: 365px;
    height: 300px;
    cursor: pointer;
  }
  .min-look{
    width: 500px;
    height: 70px;
    margin-top: 20px;
    line-height: 70px;
    display: flex;
    .icon-img{
      margin-top: 15px;
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
    .min-look-main{
      width: 420px;
      height: 100%;
      el-image:hover{
        border: 2px solid #f2dede;
      }
      .min-img-item{
        margin: 0 auto;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        overflow: hidden;
        width: 80px;
        height: 70px;
        cursor: pointer;
      }
    }
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
    line-height: 500px;
    margin: 0;
  }

</style>
