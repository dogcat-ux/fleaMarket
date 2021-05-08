<template>
  <div class="user-info-frame">
    <div>
<!--      用户名-->
      <user-info-item><span slot="infoKey">用户名：</span><span slot="infoValue">
        <el-input v-model="username" required></el-input>
      </span></user-info-item>
<!--      邮箱-->
      <user-info-item><span slot="infoKey">邮箱：</span><span slot="infoValue">
        {{user.email}}  <a href="#">修改邮箱</a>
      </span></user-info-item>
<!--     性别-->
      <user-info-item><span slot="infoKey">性别：</span><span slot="infoValue">
        <el-radio v-model="gender" label="1">男</el-radio>
        <el-radio v-model="gender" label="0">女</el-radio>
      </span></user-info-item>
<!--      年级-->
      <user-info-item><span slot="infoKey">年级：</span><span slot="infoValue">

        <el-date-picker
          v-model="grade"
          type="year"
          :picker-options="pickerOptions"
          placeholder="选择入学年份">
        </el-date-picker>

<!--        <el-input-->
<!--        v-model="grade">-->
<!--        </el-input>-->
      </span></user-info-item>
<!--      学号-->
      <user-info-item><span slot="infoKey">学号：</span><span slot="infoValue">
        <el-input
          v-model="sno"
          @blur="sno=snoFormat(sno)"
        >
        </el-input>
      </span></user-info-item>
<!--      学院-->
      <user-info-item><span slot="infoKey">学院：</span><span slot="infoValue">
        <el-input
          type="text"
          show-word-limit
          :maxlength="15"
          v-model="academy">
        </el-input>
      </span></user-info-item>
<!--      专业-->
      <user-info-item><span slot="infoKey">专业：</span><span slot="infoValue">
        <el-input
          type="text"
          show-word-limit
          :maxlength="15"
          v-model="major">
        </el-input>
      </span></user-info-item>
<!--      简介-->
      <user-info-item><span slot="infoKey">简介：</span>
        <span slot="infoValue"><el-input
          type="textarea"
          :rows="2"
          show-word-limit
          :maxlength="50"
          placeholder="请输入简介"
          v-model="introduction">
        </el-input></span>
      </user-info-item>
    </div>
<!--    按钮-->
    <div class="btn">
      <el-button type="primary" @click="toSave">保存</el-button>
      <el-button type="primary" @click="toCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
  import UserInfoItem from "./UserInfoItem";
  import {userProfile} from "../../api/user/userProfile";
  //请求
  import {upAcademy} from "../../api/user/userInfo/upAcademy";
  import {upGender} from "../../api/user/userInfo/upGender";
  import {upGrade} from "../../api/user/userInfo/upGrade";
  import {upSno} from "../../api/user/userInfo/upSno";
  import {upPortrait} from "../../api/user/userInfo/upPortrait";
  import {upIntroduction} from "../../api/user/userInfo/upIntroduction";
  import {upUsername} from "../../api/user/userInfo/upUsername";
  import {upMajor} from "../../api/user/userInfo/upMajor";

  export default {
    name: "UserInfoAmending",
    components:{
      UserInfoItem
    },
    props:["fileData"],
    data(){
      return{
        user:[],
        portraitPath:'',
        username:'',
        introduction:'',
        gender: '1',
        grade:'',
        academy:'',
        sno:'',
        major:'',
        pickerOptions: {
          disabledDate(time) {
            let minYear = new Date().getFullYear() - 10
            return (time.getTime() > Date.now()||time.getTime() < new Date(JSON.stringify(minYear)));
          }
        },
      }
    },
    methods:{
      userEdit(){
        this.$emit('userEdit');
      },
      //  价格输入
      snoFormat (val){
        let reg = /\d{9}/
        if(val){
          if(reg.test(val)){
            return val
          }else {
            this.$message.error('请输入正确学号')
            return ''
          }
        }
      },
      toCancel(){
        this.$emit('toCancel')
      },
      toSave(){
        //用户名
        if(this.username===''){
          this.$message.error('用户名必填');
        }else {
          upUsername(this.username);
          this.$message.success("更改用户名成功，请重新登录")
          sessionStorage.clear();
          location.reload();
          this.$router.replace('/login')
        }
        if(this.gender){upGender(this.gender)}//性别
        if(this.introduction){upIntroduction(this.introduction)}//简介
        if(this.academy){upAcademy(this.academy)}//学院
        if(this.sno){upSno(this.sno)}//学号
        if(this.major){upMajor(this.major)}//专业
        if(this.grade){upGrade(this.grade)}//年级
        // if(this.fileData){upPortrait(this.fileData)}//头像
        this.$emit('toSave')
      }
    },
    created() {
      userProfile().then(res=>{
        console.log(res)
        console.log(21212312313)
        if(res.status==200){
          this.user=res.data.user;
          this.portraitPath="http://3831en3237.wicp.vip"+res.data.portraitPath;
        }else{
        }
      }).catch(err=>{})
    }
  }
</script>

<style lang="scss" scoped>
  .user-info-frame{
    width: 500px;
    height: auto;
    margin: 0 auto;
    .btn{
      height: 100px;
      line-height: 100px;
    }
  }
  a{
    color: var(--color-main);
  }
  a:hover{
    color: var(--bgc);
  }
</style>
