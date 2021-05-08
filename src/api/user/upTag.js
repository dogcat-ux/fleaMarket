import Vue from 'vue';

//这边的参数提前在vue文件中添加了
export function upTag(tagName) {
  var params = new FormData();
  params.append('tagName',tagName);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upTag",
    data: params
  })
}
