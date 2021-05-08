import Vue from 'vue';

//这边的参数提前在vue文件中添加了
export function upOrderIsReceived(evaluation,orderId) {
  var params = new FormData();
  params.append('evaluation',evaluation);
  params.append('orderId',orderId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upOrderIsReceived",
    data: params
  })
}
