import Vue from 'vue';

export function allPendingGoodsPagesCount(pageSize) {
  var params = new FormData()
  params.append('pageSize',pageSize);
  return Vue.prototype.$http({
    method: 'post',
    url: "/admin/allPendingGoodsPagesCount",
    data: params
  })
}
