import Vue from 'vue';

export function addOrder(addressId ,deliveryTime,goodsId ) {
  var params = new FormData();
  params.append('addressId',addressId);
  params.append('deliveryTime',deliveryTime);
  params.append('goodsId',goodsId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/addOrder",
    data: params
  })
}
