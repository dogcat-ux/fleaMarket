<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--地址-->
    <el-form-item label="收货地址" prop="address">
      <el-input v-model="ruleForm.address"></el-input>
    </el-form-item>
<!--收货人-->
    <el-form-item label="收货人姓名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
<!--    邮箱-->
<!--    <el-form-item label="邮箱" prop="email">-->
<!--      <el-input v-model="ruleForm.email"></el-input>-->
<!--    </el-form-item>-->
<!--    邮箱-->
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model.number="ruleForm.phone"></el-input>
    </el-form-item>
<!--   门牌号 -->
    <el-form-item label="门牌号" prop="houseNo">
      <el-input v-model.number="ruleForm.houseNo"></el-input>
    </el-form-item>
<!--    默认-->
    <el-form-item  prop="isDefaultAddress ">
      <el-checkbox v-model="ruleForm.isDefaultAddress" label="设为默认" border size="medium"></el-checkbox>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="resetForm('ruleForm')" :disabled="isDisabled" >重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {eventBus} from "../../main";
  import {addAddress} from "../../api/user/addAddress";
  eventBus.$off()

  export default {
    name: "AddressForm",
    components:{
      eventBus
    },
    // props:['table-config'],
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        else if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          }
        else {
            var regex = /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/;
            if (!regex.test(value)) {
              callback(new Error('请输入正确的手机号码'));
              return false;
            } else {
              callback();
            }
          callback()
          }
        callback()
      };
      var checkHouseNo = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('门牌号不能为空'));
        }else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
        callback()
      };
      return {
        form:{},
        isDisabled:false,
        ruleForm: {
          address:'',
          name:'',
          // email:"",
          phone:'',
          houseNo:'',
          isDefaultAddress:false
        },
        rules: {
          name: [
            { required: true, message: '请输入收货人姓名', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入收货地址', trigger: 'blur' }
          ],
          // email: [
          //   { required: true, message: '请输入邮箱', trigger: 'blur' },
          //   { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          // ],
          phone: [
            { validator: checkPhone, trigger: 'blur' },
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
          houseNo: [
            { validator: checkHouseNo, trigger: 'blur' },
            { required: true, message: '请输入门牌号', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        console.log(123132)
        // addAddress(this.ruleForm).then(res=>{
        //   console.log("吸纳进地址")
        //   console.log(res)
        //   if (res.status===200){
        //     this.$message.success('保存地址成功');
        //   }
        //   location.reload()
        // }).catch(err=>{
        //   if (res.status!==200){
        //     this.$message.error('保存地址失败')
        //   }
        // })
        console.log(formName)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("out")
            addAddress(this.ruleForm).then(res=>{
              console.log(res)
              if (res.status===200){
                this.$message.success('保存地址成功');
              }
              location.reload()
            }).catch(err=>{
              if (res.status!==200){
                this.$message.error('保存地址失败')
              }
            })
          }
          else {
            this.$message.error('提交失败')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
        // this.ruleForm = this.$store.state.addressTable;
    },
  }
</script>

<style scoped>

</style>
