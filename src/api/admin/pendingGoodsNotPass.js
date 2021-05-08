import Vue from 'vue';

export function pendingGoodsNotPass(goodsId) {
  var params = new FormData()
  params.append('goodsId',goodsId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/admin/pendingGoodsNotPass",
    data: params
  })
}
