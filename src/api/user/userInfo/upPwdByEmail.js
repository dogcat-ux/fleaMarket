import Vue from 'vue';
import {encrypt} from "../../encrypt";

export function upPwdByEmail(newEncryptPwd,verifyCode) {
  var params = new FormData();
  params.append('newEncryptPwcd',encrypt(newEncryptPwd));
  params.append('verifyCode',verifyCode);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upPwdByEmail",
    data: params
  })
}
