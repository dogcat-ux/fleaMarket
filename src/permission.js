// import router from './router'
// import store from './store'
// import { Message } from "element-ui";
//
// const  whiteList = ['/login']
//
// router.beforeEach(async (to, from, next)=>{
//
// //  获取登录后的token
//   const hasToken = store.getters.token;
//   //有token
//   if (hasToken) {
//       next({path:'/'})
//     // if(to.path=='/login') {
//     //   //  如果已经登录，则直接跳转到首页
//     //   next({path:'/'})
//     // }else{
//     //
//       //  获取用户名
//       // const hasGetUserInfo = store.state.username;
//       // if (hasGetUserInfo) {
//       //   next()
//       // } else {
//       //   try {
//       //     //  如果用户名不存在,则获取用户信息
//       //     await store.dispatch('')
//       //   } catch (e) {
//       //
//       //   }
//       // }
//     }
//   //无token，跳转到登录页面
//   else {
//     if(whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`)
//     }
//   }
// })
