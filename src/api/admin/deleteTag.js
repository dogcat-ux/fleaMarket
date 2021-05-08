import Vue from 'vue';

export function deleteTag(tagId) {
  var params = new FormData()
  params.append('tagId',tagId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/admin/deleteTag",
    data: params
  })
}
