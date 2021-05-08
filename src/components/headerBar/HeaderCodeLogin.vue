<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="邮箱" prop="email">
      <el-input  v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="verification">
      <el-col :span="11">
        <el-input v-model="ruleForm.verification"
                  placeholder="请输入验证码"
                  >
        </el-input>
      </el-col>
      <el-col class="line" :span="2"><br></el-col>
      <el-col :span="11">
        <el-button type="primary" @click="verificationSubmit" >发送验证码</el-button>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {login} from "../../api/common/login";

  export default {
    name: "HeaderCodeLogin",
    components:{
      login,
    },
    data() {
      return {
        ruleForm: {
          email:'',
          verification:''
        },
        rules: {
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          verification:[
            { required: true, message: '请输入验证码',trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
      //发送验证码
      verificationSubmit(){
        sendVerification(this.ruleForm)
      },
      //表单发送
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            login(this.ruleForm);
            // request(formName)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
