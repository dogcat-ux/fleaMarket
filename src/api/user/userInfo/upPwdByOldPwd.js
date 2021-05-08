import Vue from 'vue';
import {encrypt} from "../../encrypt";

export function upPwdByOldPwd(newEncryptPwd,oldEncryptPwd) {
  var params = new FormData();
  params.append('newEncryptPwd',encrypt(newEncryptPwd));
  params.append('oldEncryptPwd',encrypt(oldEncryptPwd));
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upPwdByOldPwd",
    data: params
  })
}
