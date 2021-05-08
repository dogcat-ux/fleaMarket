<template>
  <div class="place-orders">
    <div class="place-orders-step">
      <slot name="step"></slot>
    </div>
    <!--    收货地址-->
    <div class="blank">
      <el-alert
        title="收货地址"
        type="info"
        :closable="false">
      </el-alert>
      <slot name="address"></slot>
    </div>
    <!--    收货时间-->
    <div class="blank">
      <el-alert
        title="收货时间"
        type="info"
        :closable="false">
      </el-alert>
      <div class="time-picker">
        <slot name="time"></slot>
      </div>
    </div>
    <!--    -->
    <!--    确认订单-->
    <div class="blank">
      <el-alert
        title="确认订单"
        type="info"
        :closable="false">
      </el-alert>
      <slot name="order"></slot>
    </div>
    <!--   下单 -->
    <div class="submit-order">
      <slot name="placeOrder"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OrdersDetailFrame",

  }
</script>

<style lang="scss" scoped>
  .place-orders{
    margin: 20px auto;
    width: var(--view-width);
    .place-orders-step{
    }
  }
  .defaultAddress{
    width: 80px;
    font-weight: bold;
  }
  .addressSelect{
    margin-top: 20px;
    display: inline-block;
    margin-left: 20px;
  }
  .blank{
    margin-top: 20px;
  }
  .time-picker{
    margin-top: 20px;
    margin-left: 20px;
  }
  .submit-order{
    margin-top: 20px;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
</style>
