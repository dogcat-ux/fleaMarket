import Vue from 'vue';

export function logout() {
  var params = new FormData();
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/logout",
    data: params
  })
}
