import Vue from 'vue';

export function cntOrderBySellerId(pageSize) {
  var params = new FormData();
  // params.append('sellerId ',Vue.prototype.$store.state.userId);
  params.append('pageSize',pageSize);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/cntOrderBySellerId",
    data: params
  })
}
