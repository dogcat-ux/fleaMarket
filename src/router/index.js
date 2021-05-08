import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router =  new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login'),
    },
    {
      path: '/CommodityDetails',
      name: 'CommodityDetails',
      component: () => import('../views/CommodityDetails'),
    },
    // {
    //   path: '/user/AddressManage',
    //   name: 'AddressManage',
    //   component: () => import('../components/user/AddressManage')
    // },
    {
      path: '/user/PlaceOrders',
      name: 'PlaceOrders',
      component: () => import('../views/user/PlaceOrders'),
    },
    // meta: {
    //   keepAlive: true, //此组件需要被缓存
    // }
    // {
    //   path: '/user/OrdersAll',
    //   name: 'OrdersAll',
    //   component: () => import('../components/user/OrdersAll'),
    //   // meta: {
    //   //   keepAlive: true, //此组件需要被缓存
    //   // }
    // },
    {
      path: '/user/UpGoods',
      name: 'UpGoods',
      component: () => import('../views/user/UpGoods'),
    },
    {
      path: '/user/InfoForOthers',
      name: 'InfoForOthers',
      component: () => import('../views/user/InfoForOthers'),
    },
    // {
    //   path: '/admin/PendingGoods',
    //   name: 'PendingGoods',
    //   component: () => import('../components/admin/PendingGoods'),
    //   // meta: {
    //   //   keepAlive: true, //此组件需要被缓存
    //   // }
    // },
    // {
    //   path: '/admin/AllUnsoldGoods',
    //   name: 'AllUnsoldGoods',
    //   component: () => import('../components/admin/AllUnsoldGoods'),
    // },
    {
      path: '/admin/AdminHome',
      name: 'AdminHome',
      component: () => import('../views/admin/AdminHome'),
    },
    {
      path: '/SearchPage',
      name: 'SearchPage',
      component: () => import('../views/SearchPage'),
      // meta: {
      //   keepAlive: true, //此组件需要被缓存
      // }
    },
    {
      path: '/user/OrderDetail',
      name: 'OrderDetail',
      component: () => import('../views/user/OrderDetail'),
      // meta: {
      //   keepAlive: true, //此组件需要被缓存
      // }
    },
    {
      path: '/user/OrderSoldDetail',
      name: 'OrderSoldDetail',
      component: () => import('../views/user/OrderSoldDetail'),
    },
    {
      path: '/user/UserPage',
      name: 'UserPage',
      component: () => import('../views/user/UserPage'),
    },
    {
      path: '/TabsPage',
      name: 'TabsPage',
      component: () => import('../views/TabsPage'),
    },
    {
      path: '/AllTags',
      name: 'AllTags',
      component: () => import('../views/AllTags'),
    },

  ],
})

const  whiteList = ['/login','/'];
const  adminList = ['/admin/PendingGoods','/admin/AllUnsoldGoods']
const  userList = ['/user/UploadCommodity']
// 路由拦截
router.beforeEach(async (to, from, next)=>{
    //有token
    if (window.sessionStorage.getItem('token')||to.name==='Login') {
      //拦截用户
      if(adminList.indexOf(to.path) !== -1&&Vue.prototype.$store.state.isAdmin===false){
        Vue.prototype.$message.error('非管理员不得访问该页面');
        next({
          path:'/'
        })
      }
      //拦截管理员
      if(userList.indexOf(to.path) !== -1&&Vue.prototype.$store.state.isAdmin===true){
        Vue.prototype.$message.error('管理员不得出售商品');
        next({
          path:'/'
        })
      }
      next()
    }
    //无token，跳转到登录页面
    else {
      if(whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        Vue.prototype.$message.warning("请先登录");
        next({
          path:'/login'
        })
      }
    }
    next();
})

export default router;
