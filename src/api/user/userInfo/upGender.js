import Vue from 'vue';

export function upGender(gender) {
  var params = new FormData();
  params.append('gender',gender);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upGender",
    data: params
  })
}
