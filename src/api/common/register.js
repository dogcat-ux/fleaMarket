import Vue from 'vue';
import {encrypt} from "../encrypt";

export function register(ruleForm) {
  var params = new FormData();
  params.append('email',ruleForm.email);
  params.append('encryptPassword',encrypt(ruleForm.pass));
  params.append('username',ruleForm.username);
  params.append('verifyCode',ruleForm.verification);
  return Vue.prototype.$http({
    method: 'post',
    url: "/register/reg",
    data: params
  })
}
