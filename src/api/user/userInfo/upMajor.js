import Vue from 'vue';

export function upMajor(major) {
  var params = new FormData();
  params.append('major',major);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upMajor",
    data: params
  })
}
