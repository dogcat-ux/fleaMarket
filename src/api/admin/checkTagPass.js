import Vue from 'vue';

export function checkTagPass(tagId) {
  var params = new FormData()
  params.append('tagId',tagId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/admin/checkTagPass",
    data: params
  })
}
