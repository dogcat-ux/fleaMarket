import Vue from 'vue';

export function allGoodsCount(pageSize) {
  var params = new FormData();
  params.append('pageSize',pageSize);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/allGoodsCount",
    data: params
  })
}
