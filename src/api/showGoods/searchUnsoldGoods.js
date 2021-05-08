import Vue from 'vue';

export function searchUnsoldGoods(goodsInfo,pageSize,pageNum) {
   var params = new FormData();
  params.append('goodsInfo',goodsInfo);
  params.append('pageNum',pageNum);
  params.append('pageSize',pageSize);
  return Vue.prototype.$http({
    method: 'post',
    url: "/showGoods/searchUnsoldGoods",
    data: params
  })
}
