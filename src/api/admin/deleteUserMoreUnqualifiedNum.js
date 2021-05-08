import Vue from 'vue';

export function deleteUserMoreUnqualifiedNum(uqn) {
  var params = new FormData()
  params.append('uqn',uqn);
  return Vue.prototype.$http({
    method: 'post',
    url: "/admin/deleteUserMoreUnqualifiedNum",
    data: params
  })
}

