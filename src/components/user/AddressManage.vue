<template>
  <div class="address-manage">
    <el-alert
      title="新建地址"
      type="info"
      :closable="false">
    </el-alert>
    <div class="address-form">
      <address-form></address-form>
<!--      <address-form :table-config="tableConfig"></address-form>-->
    </div>
    <el-alert
      title="管理收货地址"
      type="info"
      :closable="false">
    </el-alert>
    <div class="address-existed">
      <address-existed></address-existed>
<!--      <address-existed @edit="edit"></address-existed>-->
    </div>
  </div>
</template>

<script>
  import AddressForm from "../addressManage/AddressForm";
  import AddressExisted from "../addressManage/AddressExisted";
  export default {
    name: "AddressManage",
    components:{
      AddressForm,
      AddressExisted
    },
    data(){
      return{
      }
    },
    methods:{
    }
  }
</script>

<style lang="scss" scoped>
  .address-manage{
    margin: 20px auto;
    width: var(--view-width);
    .address-form{
      width: var(--view-width);
      height: auto;
      margin: 20px auto;
    }
    .address-existed{
      margin-top: 20px;
      margin-left: 100px;
    }
  }
</style>
