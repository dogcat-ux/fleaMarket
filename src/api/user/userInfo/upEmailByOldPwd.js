import Vue from 'vue';
import {encrypt} from "../../encrypt";

export function upEmailByOldPwd(newEmail,newEmailVerifyCode,oldEncryptPwd) {
  var params = new FormData();
  params.append('newEmail',newEmail);
  params.append('newEmailVerifyCode',newEmailVerifyCode);
  params.append('oldEncryptPwd',encrypt(oldEncryptPwd));
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upEmailByOldPwd",
    data: params
  })
}
