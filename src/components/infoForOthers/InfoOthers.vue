<template>
  <div>
    <user-info-item><span slot="infoKey">用户名：</span>
      <span slot="infoValue">{{user.username}}</span>
    </user-info-item>
    <user-info-item><span slot="infoKey">邮箱：</span><span slot="infoValue">{{user.email}}</span></user-info-item>
    <user-info-item><span slot="infoKey">性别：</span>
      <span slot="infoValue" v-if="user.gender&&user.gender===true">男</span>
      <span slot="infoValue" v-if="user.gender&&user.gender===false">女</span>
      <span slot="infoValue" v-else-if="!user.gender">暂无</span>
    </user-info-item>
    <user-info-item><span slot="infoKey">年级：</span>
      <span slot="infoValue" v-if="user.grade">{{user.grade}}</span>
      <span slot="infoValue" v-else>暂无</span>
    </user-info-item>
    <user-info-item><span slot="infoKey">学号：</span><span slot="infoValue" v-if="user.sno">{{user.sno}}</span>
      <span slot="infoValue" v-else>暂无</span>
    </user-info-item>
    <user-info-item><span slot="infoKey">学院：</span><span slot="infoValue" v-if="user.academy">{{user.academy}}</span>
      <span slot="infoValue" v-else>暂无</span>
    </user-info-item>
    <user-info-item><span slot="infoKey">专业：</span><span slot="infoValue" v-if="user.major">{{user.major}}</span>
      <span slot="infoValue" v-else>暂无</span>
    </user-info-item>
    <user-info-item><span slot="infoKey">简介：</span>
      <span slot="infoValue" v-if="user.introduction">{{user.introduction}}</span>
      <span slot="infoValue" v-else>这个人很懒，什么也没留下~</span>
    </user-info-item>
  </div>
</template>

<script>
  import UserInfoItem from "../common/UserInfoItem";
  export default {
    name: "InfoOthers",
    components:{
      UserInfoItem
    },
    props:["user"]
  }
</script>

<style scoped>

</style>
