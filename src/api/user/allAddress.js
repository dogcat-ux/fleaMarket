import Vue from 'vue';

export function allAddress() {
  var params = new FormData();
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/allAddress",
    data: params
  })
}
