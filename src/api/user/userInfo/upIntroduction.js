import Vue from 'vue';

export function upIntroduction(introduction) {
  var params = new FormData();
  params.append('introduction',introduction);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upIntroduction",
    data: params
  })
}
