import Vue from 'vue';

export function queryGoodsByTag(pageNum,pageSize,tagId) {
  var params = new FormData()
  params.append('pageNum',pageNum);
  params.append('pageSize',pageSize);
  params.append('tagId',tagId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/showGoods/queryGoodsByTag",
    data: params
  })
}
