import Vue from 'vue';

export function addMsg(content,goodsId) {
  var params = new FormData();
  params.append('content',content);
  params.append('goodsId',goodsId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/addMsg",
    data: params
  })
}
