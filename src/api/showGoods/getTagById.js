import Vue from 'vue';

export function getTagById(tagId) {
  var params = new FormData()
  params.append('tagId',tagId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/showGoods/getTagById",
    data: params
  })
}
