import Vue from 'vue';

export function isCollected(goodsId) {
  var params = new FormData();
  params.append('goodsId',goodsId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/isCollected",
    data: params
  })
}
