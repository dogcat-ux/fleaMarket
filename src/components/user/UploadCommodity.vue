<template>
  <div class="upload-commodity">
    <el-row></el-row>
<!--    上传图片-->
    <el-row>
      <el-col :span="4">商品图片:</el-col>
      <el-col :span="20">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :file-list="fileList"
          ref="upload"
          accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
          :on-preview="handlePictureCardPreview"
          :on-change="imgPreview"
          :http-request="uploadFile"
          :on-exceed="handleExceed"
          :auto-upload="false"
          :before-upload="limitSize"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-col>
    </el-row>
<!--    分割符-->
    <el-row></el-row>
<!--    信息-->
    <el-row>
      <el-col :span="2">商品信息:</el-col>
      <el-col :span="10">
        <el-input
          type="textarea"
          autosize
          maxlength="50"
          show-word-limit
          placeholder="请输入商品信息（可以说说你的使用感受，入手渠道，转手原因）"
          v-model="textarea">
        </el-input>
      </el-col>
    </el-row>
<!--    价格-->
    <el-row>
      <el-col :span="2">商品价格:</el-col>
      <el-col :span="10">
          <el-input
            v-model="price"
            @blur="price=moneyFormat(price)"
            placeholder="请输入价格（最多到小数点后俩位）"
          >
          </el-input>
     </el-col>
    </el-row>
<!--    标签-->
    <el-row>
      <el-col :span="2">商品标签:</el-col>
      <el-col :span="10">
        <el-select v-model="tags"  multiple placeholder="请选择标签(可多选)">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.tagName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
<!--    确认上传-->
    <el-row>
      <el-col :span="4">
        <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload">确认上传商品信息</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {upGoods} from "../../api/user/upGoods";
  import {getAllTag} from "../../api/showGoods/getAllTag";

  export default {
    name: "UploadCommodity",
    components:{
      upGoods,
      getAllTag
    },
    data() {
      return {
        //
        fileData: '',  // 文件上传数据（多文件合一）
        fileList: [],   // upload多文件数组
        uploadData: {
        },
        imgsList:[],
        textarea: '',
        options: [],
        tags: [],
        price:'',
        //上传
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      //限制大小
      limitSize(file,fileList){
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
          // fileList.pop()
        }
        if(!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 1MB!',
            type: 'warning'
          });
          fileList.pop()
        }
        return (extension || extension2 ||extension3) && isLt2M
      },
      // 上传文件
      uploadFile(file) {
        this.fileData.append('files',file.file);  // append增加数据
      },
      // 上传到服务器
      submitUpload() {
        let tmp = 0;
        for(let i=0;i<this.fileList.length;i++){
          console.log(i)
          console.log(this.limitSize(this.fileList[i]))
          if(this.limitSize(this.fileList[i])===false){
            tmp++;
          }
        }
        console.log(tmp)
        if(this.textarea === ''||this.price === ''||this.tags.length===0){
          this.$message.error('所有的信息都是必填项')
        }else if (tmp === 0){
          this.fileData = new FormData();  // new formData对象
          this.$refs.upload.submit();  // 提交调用uploadFile函数
          this.fileData.append('goodsInfo', this.textarea);
          this.fileData.append('price', this.price);
          this.fileData.append('sellerPhone',18759958531);
          this.fileData.append('tagsIds', this.tags);
          upGoods(this.fileData).then(res => {
              console.log(res);
              if (res.status === 200) {
                // 上传成功后，将里面的内容删除
                this.fileList = [];
                this.$message.success("上传成功");
                this.$router.replace('/');
              }
            }).catch(err => {
              console.log('失败了', err)
            })
        }
        },

      //移除
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      // 选取文件超过数量提示
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      moneyFormat (val){ //moneyFormat是函数名
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        if(val){
          if(reg.test(val)){
            return val
          }else {
            this.$message.error('请输入正确金额')
            return ''
          }
        }
      },
      imgPreview (file, fileList) {
        let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name);
        if (existFile) {
          this.$message.error('当前文件已经存在!');
          fileList.pop();
        }else{
          this.fileList = fileList;
          let fileName = file.name;
          let regex = /(.jpg|.jpeg|.png)$/;
          if (regex.test(fileName.toLowerCase())) {
            this.dialogImageUrl = file.url;
            // this.dialogVisible = true;
          } else {
            this.$message.error('请选择图片文件');
          }
        }
        if (fileList.length>5){
          this.$message.warning('当前限制选择5张图片');
          fileList.pop();
        }
        this.limitSize(file,fileList);
      },
    },
    created() {
      getAllTag().then(res=>{
        if(res.status===200){
          for (var i=0;i<res.data.tags.length;i++){
            this.options = res.data.tags;
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
</script>

<style lang="scss" scoped>
  .upload-commodity{
    margin: 20px auto;
    width: var(--view-width);
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  }
</style>
