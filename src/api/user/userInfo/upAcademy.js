import Vue from 'vue';

export function upAcademy(academy) {
  var params = new FormData();
  params.append('academy',academy);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upAcademy",
    data: params
  })
}
