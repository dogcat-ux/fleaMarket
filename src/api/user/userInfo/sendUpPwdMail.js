import Vue from 'vue';

export function sendUpPwdMail() {
  var params = new FormData();
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/sendUpPwdMail",
    data: params
  })
}
