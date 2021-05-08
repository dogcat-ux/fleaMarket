import Vue from 'vue';

export function upGrade(grade) {
  var params = new FormData();
  params.append('grade',grade);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upGrade",
    data: params
  })
}
