<template>
  <div class="commodity-details">
    <header-home>
      <span slot="left-content" @click="backHome">
          <img src="../assets/img/iconNew/back.png" alt="" class="back-img">
          返回首页
        </span>
    </header-home>
<!--   商品信息-->
    <div class="main">
      <el-row>
        <el-col :span="12">
          <div class="commodity-swiper">
            <commodity-swiper :show-array="allGoods.imagePaths"></commodity-swiper>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="goods-info">
            <div class="goods-seller">
              <span @click="goUser" class="seller">商家名称：{{this.allGoods.sellerName}}</span>
            </div>
            <div class="goods-price">
              ￥{{this.allGoods.price}}
            </div>
<!--            <div class="goods-details">-->
<!--              详细说明：{{this.allGoods.goodsInfo}}-->
<!--            </div>-->
            <div>标签：<el-tag v-for="(item,index) in this.allGoods.tagNames" :key="index">{{item}}</el-tag></div>
            <div class="goods-details">
              <el-popover trigger="hover" placement="top">
                <p>详细说明：{{this.allGoods.goodsInfo}}</p>
                <div slot="reference" class="name-wrapper">
                  <p>详细说明：{{this.allGoods.goodsInfo}}</p>
                </div>
              </el-popover>
            </div>

            <div class="buy-btn">
              <el-button type="primary" @click="buy">立即购买</el-button>
              <el-button type="primary" @click="addCollect" v-if="hasCollected===true">取消收藏</el-button>
              <el-button type="primary" @click="addCollect" v-else>收藏</el-button>
            </div>
          </div>
        </el-col>
<!--        留言-->
        <el-card class="message-card">
          <h3>留言板</h3>
          <div class="min-message" v-for="(item,index) in messages">
            <el-card shadow="never">
              <span class="messager" @click="toMessager(item,index)">{{item.criticName}}</span>
              :{{item.content}}
              <el-tag class="message-date">{{item.date}}</el-tag>
<!--              <span>{{item.date}}</span>-->
            </el-card>
          </div>
          <div class="input-message">
            <el-input
              type="textarea"
              autosize
              maxlength="50"
              show-word-limit
              placeholder="请输入留言"
              v-model="messageText">
            </el-input>
            <div class="message-btn">
              <el-button type="primary" @click="emitMessage" round>发表留言</el-button>
            </div>
          </div>
        </el-card>
      </el-row>
    </div>
<!--    留言-->
  </div>
</template>

<script>
  import CommoditySwiper from "../components/commodityDetails/CommoditySwiper";
  import HeaderHome from "../components/headerBar/HeaderHome";

  import {showSingleUnsoldGoods} from "../api/showGoods/showSingleUnsoldGoods";
  import {queryAllMsgByGoodId} from "../api/showGoods/queryAllMsgByGoodId";
  import {addMsg} from "../api/user/addMsg";
  import {pressCollect} from "../api/user/pressCollect";
  import {isCollected} from "../api/user/isCollected";

  export default {
    name: "CommodityDetails",
    components:{
      CommoditySwiper,
      HeaderHome
    },
    data() {
      return{
        allGoods:{},
        messages:[],
        messageText:'',
        collection:'收藏',
        hasCollected:false,

      }
    },
    created() {
      //展示商品详情页
      showSingleUnsoldGoods(this.$route.query.goodsId).then(res=>{
        console.log(res)
        if(res.status===200){
          this.allGoods={
            goodsId:res.data.goodsId,
            sellerName:res.data.sellerName,
            sellerId:res.data.sellerId,
            goodsInfo:res.data.goodsInfo,
            sellerPhone: res.data.sellerPhone,
            imagePaths:res.data.imagePaths,
            price:res.data.price,
            tagIds:res.data.tagIds,
            tagNames:res.data.tagNames,
          }
          for(var t=0;t<this.allGoods.imagePaths.length;t++){
            this.allGoods.imagePaths[t]=this.$global.BASE_URL+this.allGoods.imagePaths[t]
          };
        }
      }).catch(err=>{
        console.log(err)
      })
    //  返回商品所有留言
      queryAllMsgByGoodId(this.$route.query.goodsId).then(res=>{
        console.log("留言",res)
        if (res.status===200){
          console.log(213313)
          for (let i = 0; i<res.data.contents.length ;i++){
            this.messages.push({
              //  留言内容
              content:res.data.contents[i],
              //日期
              date:this.getDate(res.data.dates[i]),
              //留言者id
              criticId:res.data.criticIds[i],
              //留言者
              criticName:res.data.criticNames[i],
            })
          };
        }
      }).catch(err=>{
      })
    //获取收藏信息
      isCollected(this.$route.query.goodsId).then(res=>{
        console.log(res)
        if(res.status===200){
          this.hasCollected = res.data.isCollected;
        }else{
        }
      }).catch(err=>{})
    },
    methods:{
      getDate(date1) {
        var date = new Date(date1)
        var y = date.getFullYear()
        var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
        var d = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
        var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())+':';
        // var h = date.getHours() + ':';
        // var mi = date.getMinutes();
        var mi = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
        // var s = date.getSeconds();
        return y + '-' + m + '-' + d+' '+h+mi
      },
      //查看其他用户
      goUser(){
        this.$router.push({
          path:'/user/InfoForOthers',
          query:{
            userId:this.allGoods.sellerId
          }
        })
      },
      toMessager(item,index){
        this.$router.push({
          path:'/user/InfoForOthers',
          query:{
            userId:item.criticId
          }
        })
      },
      //购买
      buy(){
        this.$router.push({
          path: '/user/PlaceOrders',
          query:  {
            goodsId:this.allGoods.goodsId,
            allGoods:this.allGoods
          }
        })
      },
      backHome(){
        this.$router.replace('/')
      },
      addCollect(){
        pressCollect(this.$route.query.goodsId).then(res=>{
          console.log(res)
          if(res.status===200){
            this.hasCollected = res.data.hasCollected;
            this.$message.success(res.data.msg);
          }else{
            this.$message.warning(res.data.msg)
          }
        }).catch(err=>{
        })
      },
      emitMessage(){
        if(this.messageText===''){
          this.$message.warning("请输入留言内容")
        }else {
          addMsg(this.messageText,this.$route.query.goodsId).then(res=>{
            if(res.status===200){
              this.$message.success('留言成功');
              location.reload();
            }else {
              this.$message.error('留言失败')
            }
          }).catch(err=>{
            this.$message.error('留言失败')
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .commodity-details{
    .commodity-swiper{
      width: 500px;
      height: 500px;
    }
    .commodity-info{
      .text {
        font-size: 16px;
        line-height:normal;
      }

      .item {
        padding: 18px 0;
      }

      .box-card {
        width: 600px;
      }
      span{
        font-size: 20px;
      }
      .buy-btn{
        text-align: center;
      }
      .tag{
        display: inline-block;
        margin-right: 10px;
      }
    }

    .main{
      width: var(--width-main);
      margin: 0 auto;
      height: 500px;
      .goods-info{
        width: 500px;
        height: 500px;
        .goods-seller{
          cursor: pointer;
          height: 50px;
          span{
            border-bottom: 1px solid var(--color-main);
            padding: 10px;
          }
          span.seller:hover{
           color: var(--bgc);
          }
        }
        .goods-price{
          margin-top: 5px;
          font-size: 25px;
          color: #cd675a;
          height: 50px;
        }
        .goods-details{
          margin-top: 5px;
          width: 500px;
          height: 200px;
          border: 1px solid #eeeeee;
          padding: 5px;
          /*background-color: #FBF8FA;*/
          background-color: #FFFFFF;
          p{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 8;
            overflow: hidden;
          }
        }
        .buy-btn{
          margin-top: 50px;
        }
      }
    }
  }
  .message-card {
    width: var(--width-main);
    margin-top: 20px;
    height: auto;
    margin-bottom: 20px;
    .messager{
      color: var(--color-main);
    }
    span.messager:hover{
      color: var(--bgc);
    }
  }
  .input-message{
    margin-top: 20px;
    text-align: center;
  }
  .min-message{
    margin-top: 5px;
    position: relative;
    .message-date{
      position: absolute;
      right: 5px;
    }
  }
  .message-btn{
    margin: 20px auto;
  }
  .back-img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
</style>
