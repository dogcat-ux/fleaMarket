import Vue from 'vue';

export function showSingleUnsoldGoods(goodsId) {
  var params = new FormData();
  params.append('goodsId',goodsId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/showGoods/showSingleUnsoldGoods",
    data: params
  })
}
