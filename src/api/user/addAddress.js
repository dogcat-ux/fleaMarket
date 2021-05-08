import Vue from 'vue';

export function addAddress(ruleForm) {
  var params = new FormData();
  params.append('address',ruleForm.address);
  params.append('consigneeName',ruleForm.name);
  // params.append('email',ruleForm.email);
  params.append('phone',ruleForm.phone);
  params.append('houseNo',ruleForm.houseNo);
  params.append('isDefaultAddress',ruleForm.isDefaultAddress);
  // params.append('userId',Vue.prototype.$store.state.userId);
  return Vue.prototype.$http({
    method: 'post',
    url: "/user/addAddress",
    data: params
  })
}
