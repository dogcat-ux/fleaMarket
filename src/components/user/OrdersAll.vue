<template>
  <div class="orders-all">
    <el-tabs type="border-card">
      <el-tab-pane label="全部购买订单">
        <orders-of-all></orders-of-all>
      </el-tab-pane>
      <el-tab-pane label="全部出售订单">
        <sold-goods-all></sold-goods-all>
      </el-tab-pane>
<!--      <el-tab-pane label="待收货">-->
<!--        <orders-no-receive></orders-no-receive>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="待评价">待评价</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  import OrdersOfAll from "../ordersAll/OrdersOfAll";
  import OrdersNoReceive from "../ordersAll/OrdersNoReceive";
  import SoldGoodsAll from "../soldGoodsAll/SoldGoodsAll";
  export default {
    name: "OrdersAll",
    components:{
      OrdersOfAll,
      OrdersNoReceive,
      SoldGoodsAll
    },
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .orders-all{
    width: var(--view-width);
    margin: 20px auto;
  }
</style>
