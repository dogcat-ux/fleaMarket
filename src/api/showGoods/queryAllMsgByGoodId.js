import Vue from 'vue';

export function queryAllMsgByGoodId(goodsId) {
  var params = new FormData()
  params.append('goodsId',goodsId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/showGoods/queryAllMsgByGoodId",
    data: params
  })
}
