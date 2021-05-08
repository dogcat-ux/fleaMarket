<template>
  <div class="home">
<!--    背景图片-->
    <div class="home-back">
      <header-home></header-home>
    </div>
<!--    标签栏-->
    <div class="tag">
      <home-tabs></home-tabs>
    </div>
<!--图片展示栏-->
    <div class="show" id="show">
      <div class="show1">
<!--        最新上传-->
        <div class="show1-name">最新上传</div>
        <div class="show1-img">
          <div v-for="(item,index) in carouselGoods" class="img-one">
              <el-image :src="item.imagePaths[0]"
                        @click="goGoodDetail(item.goodsId)"
                        class="img-item"></el-image>
          </div>
        </div>
        <div class="show-link">
        </div>
      </div>
<!--      今日推荐-->
      <div class="show2">
        <div class="show2-name">今日推荐</div>
        <div class="show2-img">
          <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in showGoods" :key="index">
              <el-image :src="item.imagePaths[0]"
                        @click="goGoodDetail(item.goodsId)"
                        class="img-item"></el-image>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HomeTabs from "../components/HomeTabs";
  import ShowGoodsFrame from "../components/ShowGoodsFrame";
  import {allUnsoldGoodsPagesCount} from "../api/showGoods/allUnsoldGoodsPagesCount";
  import {showAllUnsoldGoods} from "../api/showGoods/showAllUnsoldGoods";
  //新的
  import SearchBox from "../components/common/SearchBox";
  import HeaderHome from "../components/headerBar/HeaderHome";
  // import Header from "../components/headerBar/Header";

  export default {
    name: "Home",
    components:{
      HomeTabs,
      ShowGoodsFrame,
    //  新的
      SearchBox,
      HeaderHome
    },
    data() {
      return {
        //未出售商品
        allGoods:'',
        //绑定的
        total:1,
        currPage: 1,  //默认第一页
        pageSize: 11, //默认展示10条数据
        //
        //搜索内容
        // searchContent:'',
        carouselGoods:[],
        showGoods:[],
        isSearchOpen:false
      }
    },
    methods:{
      requestData(){
        showAllUnsoldGoods(this.currPage,this.pageSize).then(res=>{
          console.log(res)
          if(res.status===200){
            for (var i = 0; i< res.data.goodsIds.length;i++){
              this.allGoods=[];
              for (var i = 0; i< res.data.goodsIds.length;i++){
                console.log(i)
                this.allGoods.push({
                  goodsId:res.data.goodsIds[i],
                  // sellerName:res.data.sellerNames[i],
                  sellerId:res.data.sellerIds[i],
                  goodsInfo:res.data.goodsInfos[i],
                  sellerPhone: res.data.sellerPhones[i],
                  imagePaths:res.data.imagePaths[i],
                  price:res.data.prices[i],
                  tagIds:res.data.tagIds[i],
                  // tagNames:res.data.tagNames[i],
                })
                for(var t=0;t<res.data.imagePaths[i].length;t++){
                  this.allGoods[i].imagePaths[t]=this.$global.BASE_URL+this.allGoods[i].imagePaths[t]
                }
              };
            }
            //FIXME
            // localStorage.setItem("allGoods",this.allGoods);
            this.carouselGoods = this.allGoods.slice(0,5);
            this.showGoods = this.allGoods.slice(5,11);
          }
        }).catch(err=>{
          if (err.state!==200){
            console.log("请求所有商品出错")
          }
        })
      },
      currentChange(currPage){
        this.currPage = currPage;
        console.log("现在admin/所有商品",this.currPage)
      },
      goGoodDetail(goodsId){
        this.$router.push({
          path:'/CommodityDetails',
          query:{
            goodsId:goodsId
          }
        })
      },
      //搜索
      goSearchPage(searchContent){
        console.log(searchContent);
        if(!searchContent){
          this.$message.error('请输入要搜索的相关信息')
        }else{
          this.$router.push({path:'/SearchPage',query:{
              searchContent:searchContent
          }})
        }
      },
      // toLogin(){
      //   this.$router.push('/login')
      // },
      // toUserPage(){
      //   if(this.$store.state.isAdmin===false){
      //     this.$router.push('/user/UserPage')
      //   }else {
      //     this.$router.replace('/admin/AdminHome');
      //   }
      //
      // },
      searchOpen(){
        if(this.isSearchOpen===false){
          this.isSearchOpen=true
        }else {
          this.isSearchOpen=false
        }
      }
    },
    created() {
      //申请所有页码
      allUnsoldGoodsPagesCount(this.pageSize).then(res=>{
        console.log(res)
        if(res.status===200){
          this.total = res.data.allPagesCount;
          console.log("申请所有商品页面成功");
        }
      }).catch(err=>{
        if(err.status!==200){
          console.log("申请待审核页失败");
        }
      });
        this.requestData();
    },
  }
</script>

<style lang="scss" scoped>
 /*后来的 */
 .home{
   .home-back{
     width: 100vw;
     height: 400px;
     background-image:url("../assets/img/home3.png");
     /*background-origin: content-box;*/
     background-position: 0 0;
     /*background-size: contain;*/
     background-repeat: no-repeat;
     /*background-attachment:fixed;*/
     border: none;
     position: relative;
     text-align: center;
     img{
       position: absolute;
       bottom: 0;
       width: 50px;
       height: 50px;
     }
   }
   .tag{
     width: 100vw;
     height: 100px;
     /*box-shadow: 0 0px 3px var(--color-main);*/
   }
   .show{
     width: var(--view-width);
     margin:  0 auto;
     text-align: center;
     font-size: var(--font-title);
     font-family: "DingYongKang";
     .show1{
       margin: 50px auto;
       .show1-name{
         margin: 50px 0;
       }
       .show1-img{
         display: flex;
         .img-one{
           flex: 1;
           .img-item{
             cursor: pointer;
             margin: 0 auto;
             display: table-cell;
             text-align: center;
             vertical-align: middle;
             overflow: hidden;
             width: 208px;
             height: 208px;
             padding: 5px;
           }
           /deep/ img{
             width:100%;
             height: 100%;
             object-fit:cover;
           }
         }
       }
     }
     .show2{
       margin: 50px auto;
       .show2-name{
         margin: 50px 0;
       }
       .img-item{
         cursor: pointer;
         margin: 20px auto;
         display: table-cell;
         text-align: center;
         vertical-align: middle;
         overflow: hidden;
         width: 353px;
         height: 249px;
       }
       /deep/ img{
         width:100%;
         height: 100%;
         object-fit:cover;
       }
     }
   }
 }
 .el-row {
   margin-bottom: 20px;
   &:last-child {
     margin-bottom: 0;
   }
 }
 .grid-content {
   border-radius: 4px;
   min-height: 36px;
 }
 .row-bg {
   padding: 10px 0;
   background-color: #f9fafc;
 }
</style>
