import Vue from 'vue';

export function sendFindPwdMail(email) {
  var params = new FormData();
  params.append('email',email);
  return Vue.prototype.$http({
    method: 'post',
    url: "/login/sendFindPwdMail",
    data: params
  })
}
