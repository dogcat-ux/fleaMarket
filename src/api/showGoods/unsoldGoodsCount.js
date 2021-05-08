import Vue from 'vue';

export function unsoldGoodsCount(goodsInfo,pageSize) {
  var params = new FormData()
  params.append('goodsInfo',goodsInfo);
  params.append('pageSize',pageSize);
  return Vue.prototype.$http({
    method: 'post',
    url: "/showGoods/unsoldGoodsCount",
    data: params
  })
}
