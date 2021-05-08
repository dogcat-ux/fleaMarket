<template>
  <div class="user-info">
    <div class="info-title">
      基本资料
    </div>
<!--    :http-request="uploadFile"-->
    <div class="info-photo">
      <el-avatar :src="this.$store.state.portraitPath"  :size="100" v-if="isBoxEdit===false"></el-avatar>
      <div class="img-box" v-else>
        <el-upload
          class="avatar-uploader"
          action="http://8.140.7.88:8081/user/upPortrait"
          ref="upload"
          :http-request="uploadFile"
          :on-change="imgPreview"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button size="mini" round type="primary" class="save-img-btn" @click="submitUpload">保存头像</el-button>
      </div>
    </div>

    <div class="info-box">
      <user-info-frame @userEdit="userEdit" v-if="isBoxEdit===false"></user-info-frame>
      <user-info-amending @toCancel="toCancel"  @toSave="toSave" :file-data="fileData" v-else> </user-info-amending>
    </div>
  </div>
</template>

<script>
  import UserInfoFrame from "../common/UserInfoFrame";
  import UserInfoAmending from "../common/UserInfoAmending";
  import {upPortrait} from "../../api/user/userInfo/upPortrait";

  export default {
    name: "UserInfo",
    data(){
      return{
        isBoxEdit:false,
        imageUrl: '',
        //头像文件
        fileData:'',
        progressFlag:false
      }
    },
    components:{
      UserInfoFrame,
      UserInfoAmending
    },
    methods:{
      userEdit(){
        this.isBoxEdit = true;
      },
      toCancel(){
        this.isBoxEdit = false;
      },
      toSave(){
        this.isBoxEdit = false;
      },
      handleAvatarSuccess(file) {
        console.log(file)
        console.log(file.raw)
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        let testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'jpg'
        const extension2 = testmsg === 'png'
        const extension3 = testmsg === 'jpeg'
        const isLt2M = file.size / 1024 / 1024 < 1     //这里做文件大小限制
        if(!extension && !extension2 && !extension3) {
          this.$message({
            message: '上传文件只能是 jpg,png,jpeg格式!',
            type: 'warning'
          });
        }
        if(!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 1MB!',
            type: 'warning'
          });
        }
        return (extension || extension2 ||extension3) && isLt2M
      },
    //上传
      uploadFile(file) {
        this.fileData = file
      },
      submitUpload(){
        this.$refs.upload.submit();  // 提交调用uploadFile函数
        if(!this.fileData.file){
          this.$message.error("请上传头像")
        }else{
          upPortrait(this.fileData.file).then(res=>{
            console.log(res)
            if (res.status===200){
              if (res.data.status===200){
                this.$store.commit('GET_portraitPath',this.$global.BASE_URL+res.data.portraitPath)
                this.$message.success(res.data.msg);
                sessionStorage.clear();
                this.$router.replace('/login');
                location.reload();
              }else {
                this.$message.error(res.data.msg);
              }
            }else {
              this.$message.error(res.data.msg);
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      imgPreview (file) {
        let fileName = file.name;
        let regex = /(.jpg|.jpeg|.png)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.imageUrl = URL.createObjectURL(file.raw);
          // this.imageUrl = file.url;
        } else {
          this.$message.error('请选择图片文件');
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .user-info{
    width: 80%;
    height: 100%;
    .info-title{
      font-size: var(--font-title);
      margin-top: 20px;
      text-align: center;
      height: 30px;
    }
    .info-photo{
      height: 200px;
      line-height: 200px;
      .img-box{
        margin: 10px auto;
        width: 100px;
        height: 100px;
        line-height: 100px;
        .save-img-btn{
          /*<!--margin-left: -10px;-->*/
        }
      }
    }
    .info-box{
      width: 80%;
      height: 100%;
      margin: 0 auto;
    }
  }

  //asdsa
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload {
    border: 1px dashed #d9d9d9;
    width: 100px;
    height: 100px;
    /*border-radius: 50%;*/
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: auto;
    max-height: 100%;
    /*object-fit: fill;//转化不同类型*/
    }
</style>
