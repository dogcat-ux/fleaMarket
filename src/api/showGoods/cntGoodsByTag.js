import Vue from 'vue';

export function cntGoodsByTag(pageSize,tagId) {
  var params = new FormData()
  params.append('pageSize',pageSize);
  params.append('tagId',tagId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/showGoods/cntGoodsByTag",
    data: params
  })
}
