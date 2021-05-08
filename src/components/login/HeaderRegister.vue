<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="邮箱" prop="email">
      <el-input  v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input  v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
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
  // <!--  通过$emit传出了注册事件-->
  import {register} from "../../api/common/register";
  import {sendMail} from "../../api/common/sendMail";

  export default {
    name: "HeaderRegister",
    components:{
      register,
    },
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          email:'',
          pass: '',
          checkPass: '',
          verification:'',
          username:''
        },
        rules: {
          email:[
            { required: true, message: '请输入邮箱 地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          pass: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ],
          verification:[
            { required: true, message: '请输入验证码',trigger: 'blur' }
          ],
          username:[
            { required: true, message: '请输入用户名',trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
      //发送验证码
      verificationSubmit(){
        sendMail(this.ruleForm).then(res=>{
          console.log('验证码',res)
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
            register(this.ruleForm).then(res=>{
              console.log('注册提交',res)
              if(res.status===200){
                if (res.data.status ===200){
                  this.$message.success(res.data.msg+',请登录');
                  this.$emit('registerSuccess');
                  this.$router.replace('/login');
                }else{
                  this.$message.error(res.data.msg);
                }
              }
            }).catch(err=>{
              console.log(err)
            });
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
