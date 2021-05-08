import Vue from 'vue';
import {encrypt} from "../encrypt";

export function findPwd(email,newEncryptPwd,verifyCode) {
  var params = new FormData();
  params.append('email',email);
  params.append('newEncryptPwd',encrypt(newEncryptPwd));
  params.append('verifyCode',verifyCode);
  return Vue.prototype.$http({
    method: 'post',
    url: "/login/findPwd",
    data: params
  })
}
