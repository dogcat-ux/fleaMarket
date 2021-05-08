import Vue from 'vue';

export function upPortrait(file) {
  var params = new FormData();
  params.append('newPortrait',file);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upPortrait",
    data: params
  })
}
