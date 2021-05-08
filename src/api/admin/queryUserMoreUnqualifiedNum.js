import Vue from 'vue';

export function queryUserMoreUnqualifiedNum(uqn) {
  var params = new FormData()
  params.append('uqn',uqn);
  return Vue.prototype.$http({
    method: 'post',
    url: "/admin/queryUserMoreUnqualifiedNum",
    data: params
  })
}
