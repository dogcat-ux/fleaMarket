<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="登录密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新邮箱" prop="email">
      <el-input  v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="verification">
      <el-col :span="11">
        <el-input v-model="ruleForm.verification"
                  placeholder="请输入验证码">
        </el-input>
      </el-col>
      <el-col class="line" :span="2"><br></el-col>
      <el-col :span="11">
        <el-button type="primary" @click="verificationSubmit">发送验证码</el-button>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {upEmailByOldPwd} from "../../api/user/userInfo/upEmailByOldPwd";
  import {sendUpNewEmailMail} from "../../api/user/userInfo/sendUpNewEmailMail";

  export default {
    name: "UpEmailByPwd",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm: {
          email:'',
          pass: '',
          verification:'',
        },
        rules: {
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          pass: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          verification:[
            { required: true, message: '请输入验证码',trigger: 'blur' }
          ],
        },
      };
    },
    methods: {
      //发送验证码
      verificationSubmit(){
        sendUpNewEmailMail().then(res=>{
          this.$message.success('成功发送验证码')
          if(res.status===200){
            this.$message.success('请查看邮箱获取验证码');
          }
        }).catch(err=>{
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            upEmailByOldPwd(this.ruleForm.email,this.ruleForm.verification,this.ruleForm.pass).then(res=>{
              if(res.status===200){
                this.$message.success("邮箱更新成功")
              }else {
                this.$message.error(res.data.msg)
              }
            }).catch(err=>{
              this.$message.error(res.data.msg)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
