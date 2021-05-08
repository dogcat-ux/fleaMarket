<template>
  <div class="up-goods">
    <min-header></min-header>
    <el-card class="up-goods-main">
      <upload-commodity></upload-commodity>
    </el-card>
  </div>
</template>

<script>
  import UploadCommodity from "../../components/user/UploadCommodity";
  import MinHeader from "../../components/headerBar/MinHeader";
  export default {
    name: "UpGoods",
    components:{
      MinHeader,
      UploadCommodity
    }
  }
</script>

<style lang="scss" scoped>
  .up-goods{
    background: repeating-linear-gradient(to right,var(--bgc),var(--color-bgc2));
    height: 100vh;
  }
  .up-goods-main{
    width: var(--view-width);
    height: auto;
    margin: 0 auto;
  }
</style>
