import Vue from 'vue';

export function getAllTag() {
  return Vue.prototype.$http({
    method: 'post',
    url: "/showGoods/getAllTag",
  })
}
