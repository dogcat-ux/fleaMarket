<template>
  <div>
    <small-title :title="'审核标签'"></small-title>
    <el-table
      :data="tags"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="标签ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tagName"
        label="标签名"
        width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="360"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="tagPass(scope.$index,scope.row)">通过</el-button>
          <el-button type="primary" @click="tagNotPass(scope.$index,scope.row)">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {allPendingTag} from "../../api/admin/allPendingTag";
  import SmallTitle from "../common/SmallTitle";
  import {checkTagPass} from "../../api/admin/checkTagPass";
  import {deleteTag} from "../../api/admin/deleteTag";
  export default {
    name: "PendingTags",
    data(){
      return{
        tags:[],
      }
    },
    components:{
      SmallTitle
    },
    methods:{
      tagPass(index,row){
        console.log(index)
        checkTagPass(row.id).then(res=>{
          console.log(res)
          console.log(222222)
          if(res.status===200){
            this.$message.success(res.data.msg);
            this.tags.splice(index,1);
          }else{
            this.$message.error(res.data.msg);
          }
        }).catch(err=>{})
      },
      tagNotPass(index,row){
        deleteTag(row.id).then(res=>{
          console.log(res)
          console.log(222222)
          if(res.status===200){
            this.$message.success(res.data.msg);
            this.tags.splice(index,1);
          }else{
            this.$message.error(res.data.msg);
          }
        }).catch(err=>{})
      }
    },
    created() {
      allPendingTag().then(res=>{
        console.log(res)
        if(res.status===200){
          this.tags = res.data.tags
        }else{
        }
      }).catch(err=>{})
    }
  }
</script>

<style scoped>

</style>
