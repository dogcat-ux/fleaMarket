<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--    <el-form-item label="邮箱" prop="email">-->
<!--      <el-input  v-model="ruleForm.email"></el-input>-->
<!--    </el-form-item>-->
    <el-form-item label="邮箱/用户名" prop="userInfo">
      <el-input  v-model="ruleForm.userInfo"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// <!--  通过$emit传出了提交事件-->
  import {login} from "../../api/common/login";
  export default {
    name: "HeaderLogin",
    components:{
      login
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
      return {
        ruleForm: {
          // email:'',
          userInfo:'',
          pass: '',
        },
        rules: {
          // email:[
          //   { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          //   { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          // ],
          userInfo: [
            { required: true,message: '请输入邮箱地址或用户名', trigger: 'blur' }
          ],
          pass: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("成功提交")
            login(this.ruleForm).then(res=>{
              console.log("res",res)
              if(res.data.status==200){
                  this.$store.commit('GET_USERID',res.data.userId)
                  this.$store.commit('GET_USERNAEM',res.data.username)
                  this.$store.commit('GET_EMAIL',res.data.email)
                  this.$store.commit('GET_ISADMIN',res.data.isAdmin)
                  // this.$store.commit('GET_PASSWORD',res.data.password)
                  this.$store.commit('SET_TOKEN',res.data.jwt)
                  this.$store.commit('GET_ISLOGIN',true)
                  this.$store.commit('GET_portraitPath',this.$global.BASE_URL+res.data.portraitPath)

                  // this.$store.state.username = res.data.username;
                  // this.$store.state.email = res.data.email;
                  this.$message.success('登录成功');
                  this.$emit('loginSuccess')
                }else{
                this.$message.error(res.data.msg)
              }
            }).catch(err=>{

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
