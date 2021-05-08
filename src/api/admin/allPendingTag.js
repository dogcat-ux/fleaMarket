import Vue from 'vue';

export function allPendingTag() {
  // var params = new FormData()
  return Vue.prototype.$http({
    method: 'post',
    url: "/admin/allPendingTag",
    // data: params
  })
}
