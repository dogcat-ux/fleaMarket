import Vue from 'vue';

export function pressCollect(goodsId) {
  var params = new FormData();
  params.append('goodsId',goodsId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/pressCollect",
    data: params
  })
}
