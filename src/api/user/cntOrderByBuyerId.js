import Vue from 'vue';

export function cntOrderByBuyerId(pageSzie) {
  var params = new FormData();
  // params.append('buyerId',Vue.prototype.$store.state.userId);
  params.append('pageSize',pageSzie);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/cntOrderByBuyerId",
    data: params
  })
}
