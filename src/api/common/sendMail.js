import Vue from 'vue';

export function sendMail(ruleForm) {
  var params = new FormData();
  params.append('email',ruleForm.email);
  return Vue.prototype.$http({
    method: 'post',
    url: "/register/sendMail",
    data: params
  })
}
