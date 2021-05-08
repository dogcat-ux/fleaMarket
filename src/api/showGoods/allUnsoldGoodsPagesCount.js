import Vue from 'vue';

export function allUnsoldGoodsPagesCount(pageSize) {
  var params = new FormData();
  params.append('pageSize',pageSize);
  return Vue.prototype.$http({
    method: 'post',
    url: "/showGoods/allUnsoldGoodsPagesCount",
    data: params
  })
}
