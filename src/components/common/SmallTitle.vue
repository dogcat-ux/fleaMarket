<template>
  <div class="title">
    <span>{{title}}</span>
  </div>
</template>

<script>
  export default {
    name: "SmallTitle",
    props:["title"]
  }
</script>

<style lang="scss" scoped>
  .title{
    width: 100%;
    height: 50px;
    font-size: var(--font-title);
    padding: 10px;
    position: relative;
    span{
      border-bottom: 1px solid var(--color-main);
      position: absolute;
      left: 0;
    }
    .img{
      width: 30px;
      height: 30px;
    }
  }
</style>
