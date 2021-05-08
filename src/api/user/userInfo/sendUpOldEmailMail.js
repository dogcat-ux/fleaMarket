import Vue from 'vue';

export function sendUpOldEmailMail() {
  var params = new FormData();
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/sendUpOldEmailMail",
    data: params
  })
}
