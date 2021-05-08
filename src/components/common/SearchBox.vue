<template>
  <div>
    <div class="search">
      <input type="text" class="search-input"  @keyup.13 = "handleKeyUp" v-model="searchContent" :placeholder="placeholder">
      <img src="../../assets/img/iconNew/search.png" alt="search" class="search-img" @click="toSearch">
    </div>
  </div>
</template>

<script>
// <!--  emit出事件toSearch，包含参数this.searchContent
  export default {
    name: "SearchBox",
    props:["placeholder"],
    data(){
      return{
        searchContent:'',
      }
    },
    methods:{
      toSearch(){
        console.log(56565656)
        this.$emit('toSearch',this.searchContent)
      },
      handleKeyUp(){
        console.log(56565656)
        this.$emit('toSearch',this.searchContent)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search{
    display: flex;
    background-color: #fff;
    border-radius: 50px;
    border: 1px solid var(--color-sec);
    width: 250px;
    height: 35px;
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */
    .search-img{
      width: 20px;
      height: 20px;
      margin: auto;
      cursor: pointer;
    }
    .search-input{
      width: 200px;
      border-radius: 10px;
      outline-style: none ;
      border: none;
      margin: 0 auto;
      height: 30px;
    }
  }
  div.search:hover{
    border: 1px solid var(--color-main);
  }
</style>
