import Vue from 'vue';

export function queryAddressInfById(addressId) {
  var params = new FormData();
  params.append('addressId',addressId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/queryAddressInfById",
    data: params
  })
}
