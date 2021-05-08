import Vue from 'vue';

export function pendingGoodsPass(goodsId) {
  var params = new FormData()
  params.append('goodsId',goodsId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/admin/pendingGoodsPass",
    data: params
  })
}
