import Vue from 'vue';

//这边的参数提前在vue文件中添加了
export function upGoods(params) {
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upGoods",
    data: params
  })
}
