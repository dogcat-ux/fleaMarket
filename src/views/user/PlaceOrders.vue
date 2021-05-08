<template>
  <div>
    <min-header></min-header>
    <orders-detail-frame>
    <div slot="address">
      <div
        v-for="(item,index) in allAddressData"
        @click="radioClick(item.id,index)"
        class="addressSelect">
        <el-radio v-model="radio1"
                  :label="-1"
                  border
                  v-if="item.defaultAddress===true"
        >
<!--          defaultAddress-->
          <span  class="defaultAddress">默认地址</span>
          {{item.address}}(详细地址) {{item.houseNo}}(门牌号)  {{item.consigneeName}}(收) {{item.phone}}
        </el-radio>
      </div>
<!--      radio：排除掉默认地址的index-->
      <div
        v-for="(item,index) in allAddressData"
        @click="radioClick(item.id,index)"
        class="addressSelect">
        <el-radio v-model="radio1" :label="index" border v-if="item.defaultAddress!==true">
          <!--          defaultAddress-->
          {{item.address}}(详细地址) {{item.houseNo}}(门牌号)  {{item.consigneeName}}(收) {{item.phone}}
        </el-radio>
      </div>
      <router-link to="/user/AddressManage"><el-link type="primary">管理地址</el-link></router-link>
    </div>

    <!--    时间-->
    <el-row slot="time">
      <el-col :span="6">
        <el-date-picker
          v-model="date"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-time-picker
          v-model="time"
          :picker-options="{
        selectableRange: '8:00:00 - 22:00:00'
      }"
          placeholder="任意时间点">
        </el-time-picker>
      </el-col>
    </el-row>
<!--订单详情-->
    <order-detail-table :table-data="tableData" class="blank" slot="order"></order-detail-table>
    <el-button type="primary" @click="placeOrder" slot="placeOrder">提交订单</el-button>
  </orders-detail-frame>
  </div>
</template>

<script>
  import {allAddress} from "../../api/user/allAddress";
  import {addOrder} from "../../api/user/addOrder";
  import OrdersDetailFrame from "../../components/OrdersDetailFrame";
  import MinHeader from "../../components/headerBar/MinHeader";
  import OrderDetailTable from "../../components/orderDetail/OrderDetailTable";

  export default {
    name: "PlaceOrders",
    components:{
      allAddress,
      addOrder,
      OrdersDetailFrame,
      MinHeader,
      OrderDetailTable
    },
    data () {
      return {
        defaultIndex:0,
        //时间选择器
        time:'',
        // data: new Date(2021, 4, 12, 18, 40),
        date: '',
        //
        radio1: -1,
        allAddressData:[],
      //  日期选择器
        pickerOptions: {
          disabledDate(time) {
            return (time.getTime() < Date.now()- 8.64e7)||(time.getTime()> Date.now() + 3600 * 1000 * 24 * 30);
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '后天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
              picker.$emit('pick', date);
            }
          }]
        },
      //  数据
        tableData:[],
        allGoods:this.$route.query.allGoods
      }
    },
    created() {
      //获得所有地址
      allAddress().then(res=>{
        console.log(res)
        if(res.status==200){
          console.log(55)
          this.allAddressData = res.data.addressInfos;
        }
      })
        .catch(err => {
          if(err.status!==200){
            console.log("申请全部地址出错")
            console.log(err)
          }
        })
    },
    mounted() {
      this.tableData.push(this.allGoods);
    },
    methods:{
      radioClick(id,index){
        this.addressId=id;
      },
      getDate(date1) {
        var date = new Date(date1)
        var y = date.getFullYear()
        var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
        var d = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
        return y + '-' + m + '-' + d
      },
      getTime(time) {
        var date = new Date(time)
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return h+m+s
      },
      placeOrder() {
        var i = 0;
        this.allAddressData.forEach(function (x,index,a){
          if(x.defaultAddress===true){
            i = index;
          }
        })
        if(this.date===''||this.time===''){
          this.$message.error('全部信息都是必填信息')
        }else {
          var deliveryTime = this.getDate(this.date)+' '+this.getTime(this.time);
          var addressId = 0;
          if(this.radio1===-1){
            addressId = this.allAddressData[i].id;
          }else{
            addressId = this.allAddressData[this.radio1].id;
          }
          var goodsId = this.$route.query.goodsId;
          addOrder(addressId,deliveryTime,goodsId).then(res=>{
            if (res.status==200){
              this.$message.success('成功下单！');
              this.$router.replace('/')
            }
          }).catch(err=>{
            if(res.status!==200){
              this.$message.error('下单失败')
            }
          })
        }
      },
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
</style>
