import Vue from 'vue';

export function collectOfUser(pageNum,pageSize) {
  var params = new FormData();
  params.append('pageNum',pageNum);
  params.append('pageSize',pageSize);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/collectOfUser",
    data: params
  })
}
