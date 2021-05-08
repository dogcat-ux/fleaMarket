import Vue from 'vue';

export function showAllUnsoldGoods(pageNum,pageSize) {
  var params = new FormData();
  params.append('pageSize',pageSize);
  params.append('pageNum',pageNum);
  return Vue.prototype.$http({
    method: 'post',
    url: "/showGoods/showAllUnsoldGoods",
    data: params
  })
}
