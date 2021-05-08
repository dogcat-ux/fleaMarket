<template>
  <el-pagination
    :current-page.sync="currPage"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-size="pageSize"
    layout="prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<script>
  //此组件作为子组件
  //需要从外部传入的参数(通过prop)：
  //1.总页数 2.pageSize
  //需要传出的参数（通过$emit）
  //1.当前页 pageNum 2.请求函数
  export default {
    name: "Pagination",
    props:{
      total:Number,
      pageSize:Number
    },
    data(){
      return{
        // total:1,
        currPage: 1,  //默认第一页
        // pageSize: 16, //默认展示10条数据
      }
    },
    methods: {
      //分页
      getData(){
        //请求接口后取数据给tableData赋值
        //请求的接口的参数给个参考：
        /**
         data:{
                    offset:(this.currPage-1)*this.pageSize, //每次传过去的页数，我这边后端是从0开始分页的
                    limit:this.pageSize, //每页需要展示的条数
                    keywords:this.input  //双向绑定的关键字
                 },
         返回res.data=this.tableData
         **/
        this.$emit('requestData');
      },
      handleSizeChange(val) {
        //改变每页显示数量重新请求数据，重置当前页为第一页
        this.pageSize = val;
        this.currPage = 1;
        this.getData()
      },
      handleCurrentChange(val) {
        //点击改变当前页
        this.currPage = val;
        //传出当前页数
        this.$emit('currentChange',val);
        this.getData()
      },
    },
  }
</script>

<style scoped>

</style>
