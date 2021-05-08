import Vue from 'vue';

export function upUsername(newUsername) {
  var params = new FormData();
  params.append('newUsername',newUsername);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upUsername",
    data: params
  })
}
