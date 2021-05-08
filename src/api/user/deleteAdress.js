import Vue from 'vue';

export function deleteAddress(id) {
  var params = new FormData();
  params.append('addressId',id);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/deleteAddress",
    data: params
  })
}
