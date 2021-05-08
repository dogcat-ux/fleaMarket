import Vue from 'vue';

export function sendUpNewEmailMail(newEmail) {
  var params = new FormData();
  params.append('newEmail',newEmail);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/sendUpNewEmailMail",
    data: params
  })
}
