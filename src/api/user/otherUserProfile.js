import Vue from 'vue';

export function otherUserProfile(userId) {
  var params = new FormData();
  params.append('userId',userId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/otherUserProfile",
    data: params
  })
}
