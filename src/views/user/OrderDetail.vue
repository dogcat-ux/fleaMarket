<template>
  <div>
    <min-header></min-header>
    <orders-detail-frame>
    <!--    步骤条-->
<!--    <el-steps :space="200" :active="2" finish-status="success" slot="step">-->
<!--      <el-step title="确认订单信息"></el-step>-->
<!--      <el-step title="双方确认完成交易"></el-step>-->
<!--      <el-step title="双方互评"></el-step>-->
<!--    </el-steps>-->
    <!--    收货地址-->
    <div slot="address" class="address">
       <div>
         我的收货地址：{{addressInfo.address}}
       </div>
      <div>
         我的门牌号：{{addressInfo.houseNo}}
       </div>
    </div>
    <!--    时间-->
    <div slot="time">
      {{orderData.deliveryTime}}
    </div>
    <!--订单详情-->
    <order-detail-table :table-data="tableData" class="blank" slot="order"></order-detail-table>
  </orders-detail-frame>
  </div>
</template>

<script>
  import OrdersDetailFrame from "../../components/OrdersDetailFrame";
  import MinHeader from "../../components/headerBar/MinHeader";
  import OrderDetailTable from "../../components/orderDetail/OrderDetailTable";
  import {showSingleUnsoldGoods} from "../../api/showGoods/showSingleUnsoldGoods";
  import {queryAddressInfById} from "../../api/user/queryAddressInfById";

  export default {
    name: "OrderDetail",
    components:{
      OrdersDetailFrame,
      OrderDetailTable,
      MinHeader
    },
    data () {
      return{
        addressInfo:{},
        allGoods:{},
        tableData:[],
        orderData:this.$route.query.tableData
      }
    },
    created() {
      //获得商品详情信息
      showSingleUnsoldGoods(this.$route.query.goodsId).then(res=>{
        console.log('详情页res')
        console.log(res)
        if(res.status===200){
          this.tableData.push({
            goodsId:res.data.goodsId,
            sellerName:res.data.sellerName,
            sellerId:res.data.sellerId,
            goodsInfo:res.data.goodsInfo,
            sellerPhone: res.data.sellerPhone,
            imagePaths:res.data.imagePaths,
            price:res.data.price,
            tagIds:res.data.tagIds,
            tagNames:res.data.tagNames,
          })
          for(var t=0;t<this.tableData[0].imagePaths.length;t++){
            this.tableData[0].imagePaths[t]=this.$global.BASE_URL+this.tableData[0].imagePaths[t]
          };
        }
      }).catch(err=>{
        console.log(err)
      });
    // 查询地址
      queryAddressInfById(this.orderData.addressId).then(res=>{
        console.log(res)
        if(res.status===200){
          this.addressInfo = res.data.addressInfo;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    mounted() {
    },
    methods:{
    },
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
  .address{
    margin-top: 10px;
    margin-left: 20px;
  }
</style>
