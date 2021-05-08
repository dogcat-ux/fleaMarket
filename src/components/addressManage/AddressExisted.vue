<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
<!--    第一列-->
    <el-table-column
      label="收货人"
      width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.consigneeName }}</span>
      </template>
    </el-table-column>
<!--    第二列-->
    <el-table-column
      label="收货地址"
      width="240">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>地址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.address }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
<!--第三列-->
    <el-table-column
      label="门牌号"
      width="90">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.houseNo }}</span>
      </template>
    </el-table-column>
<!--第四列-->
    <el-table-column
      label="手机号"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.phone}}</span>
      </template>
    </el-table-column>
    <!--      最后一列-->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-tag type="warning"
                class="defaultAddress"
                v-if="scope.row.defaultAddress===true"
        >默认地址</el-tag>
        <el-button
          size="mini"
          v-else
          @click="handleDefault(scope.$index, scope.row)">设为默认</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {eventBus} from "../../main";
  import {allAddress} from "../../api/user/allAddress";
  import {updateDefaultAddress} from "../../api/user/updateDefaultAddress"
  import {deleteAddress} from "../../api/user/deleteAdress";

  eventBus.$off()
  export default {
    name: "AddressExisted",
    components:{
      allAddress,
      updateDefaultAddress,
      eventBus
    },
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.$store.commit('GET_ADDRESSTABLE', row);
      },
      handleDelete(index, row) {
        //删除dom
        if(row.defaultAddress!==true){
          this.tableData.splice(index,1)
        }
        //发送请求
        deleteAddress(row.id).then(res=>{
          console.log(res)
          if(res.status===200){
            if(res.data.status!==200){
              this.$message.error(res.data.msg)
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      handleDefault(index, row){
        console.log(index,row)
        //发送设置新地址的请求
        updateDefaultAddress(row.id).then(res=>{
          location.reload()
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    //获取表格中所需的地址数据
    created() {
    //  页面加载前申请
      allAddress().then(res=>{
        console.log('请求所有地址',res)
        if(res.status==200){
            this.tableData = res.data.addressInfos;
        }
      })
        .catch(err => {
          if(err.status!==200){
            console.log("申请全部地址出错")
            console.log(err)
          }
        })
    },
  }
</script>

<style lang="scss" scoped>
  .defaultAddress{
    margin-left: 10px;
  }
</style>
