import Vue from 'vue';

export function cntCollectByUser(pageSize) {
  var params = new FormData();
  params.append('pageSize',pageSize);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/cntCollectByUser",
    data: params
  })
}
