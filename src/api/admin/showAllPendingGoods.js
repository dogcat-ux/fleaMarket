import Vue from 'vue';

export function showAllPendingGoods(pageNum,pageSize) {
  var params = new FormData()
  params.append('pageNum',pageNum);
  params.append('pageSize',pageSize);
  return Vue.prototype.$http({
    method: 'post',
    url: "/admin/showAllPendingGoods",
    data: params
  })
}
