<template>
  <div>
    <small-title :title="'管理用户账户(输入你要查询的不合格商品数，将会返回不合格商品数大于等于这个数的用户)'"></small-title>
    <div class="admin-box">
      <div class="top-box">
        <search-box :placeholder="'请输入不合格商品数'"
                    @toSearch="toSearch"
                    class="search-box"></search-box>
        <el-button type="primary" round @click="deleteUser">批量删除用户</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="username"
          label="用户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="用户邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="unqualifiedNum"
          label="不合格商品数"
          width="180">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import SmallTitle from "../common/SmallTitle";
  import SearchBox from "../common/SearchBox";
  import {queryUserMoreUnqualifiedNum} from "../../api/admin/queryUserMoreUnqualifiedNum";
  import {deleteUserMoreUnqualifiedNum} from "../../api/admin/deleteUserMoreUnqualifiedNum";

  export default {
    name: "AdminUser",
    components:{
      SmallTitle,
      SearchBox
    },
    data(){
      return{
        tableData:[],
        searchContent:''
      }
    },
    methods:{
      toSearch(searchContent){
        this.searchContent=searchContent;
        queryUserMoreUnqualifiedNum(searchContent).then(res=>{
          console.log(res)
          if(res.status===200){
            this.tableData = res.data.users;
          }else{
          }
        }).catch(err=>{})
      },
      deleteUser(){
        deleteUserMoreUnqualifiedNum(this.searchContent).then(res=>{
          console.log(res)
          if(res.status===200){
            if(res.status.data===200){
              this.$message.success("删除成功")
            }else{
              this.$message.error(res.data.msg)
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  .admin-box{
    width: var(--view-width);
    height: 100vh;
    margin: 20px auto;
    .top-box{
      width: auto;
      height: 60px;
      position: relative;
      .search-box{
        position: absolute;
      }
    }
  }
</style>
