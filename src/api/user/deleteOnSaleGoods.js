import Vue from 'vue';

export function deleteOnSaleGoods(goodsId) {
  var params = new FormData();
  params.append('goodsId',goodsId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/deleteOnSaleGoods",
    data: params
  })
}
