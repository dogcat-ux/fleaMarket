import Vue from 'vue';

export function upSno(sno) {
  var params = new FormData();
  params.append('sno',sno);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/upSno",
    data: params
  })
}
