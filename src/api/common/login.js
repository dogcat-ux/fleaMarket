import Vue from 'vue';
import {encrypt} from "../encrypt";

export function login(ruleForm) {
  var params = new FormData();
  params.append('userInfo',ruleForm.userInfo);
  // params.append('userInfo',ruleForm.email);
  // params.append('password',ruleForm.pass);
  params.append('encryptPassword',encrypt(ruleForm.pass));
  return Vue.prototype.$http({
    method: 'post',
    url: "/login/loginByPwd",
    data: params
  })
}
