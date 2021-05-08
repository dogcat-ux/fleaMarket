import Vue from 'vue';

export function queryOrderBySellerId(pageNum,pageSize) {
  var params = new FormData();
  // params.append('sellerId',Vue.prototype.$store.state.userId);
  params.append('pageNum',pageNum);
  params.append('pageSize',pageSize);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/queryOrderBySellerId",
    data: params
  })
}
