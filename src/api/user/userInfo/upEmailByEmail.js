import Vue from 'vue';

export function upEmailByEmail(newEmail,newEmailVerifyCode,oldEmailVerifyCode) {
  var params = new FormData();
  params.append('newEmail',newEmail );
  params.append('newEmailVerifyCode',newEmailVerifyCode);
  params.append('oldEmailVerifyCode',oldEmailVerifyCode );
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upEmailByEmail",
    data: params
  })
}
