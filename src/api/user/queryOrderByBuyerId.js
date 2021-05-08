import Vue from 'vue';

export function queryOrderByBuyerId(pageNum,pageSize) {
  var params = new FormData();
  params.append('buyerId',Vue.prototype.$store.state.userId);
  params.append('pageNum',pageNum);
  params.append('pageSize',pageSize);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/queryOrderByBuyerId",
    data: params
  })
}
