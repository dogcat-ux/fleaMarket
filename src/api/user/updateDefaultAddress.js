import Vue from 'vue';

export function updateDefaultAddress(id) {
  var params = new FormData();
  params.append('addressId',id);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/updateDefaultAddress",
    data: params
  })
}
