import {request, post} from '../utils/request';

export function queryUser(data) {
  return post('/user/get/all',data);
}
export function addUser(data) {
  return request('/resource/system/addUser.do?'+data);
}
export function deleteUser(data) {
  return request('/resource/system/deleteUser.do?userId='+data.userId);
}
export function updateUser(data) {
  debugger
  return request('/resource/system/updateUser.do?userId='
  +data.user.userId+'&name='+data.user.name+'&userPassword='+data.user.password+'&age='+data.user.age
  +'&birth='+data.user.birth+'&telPhone='+data.user.telPhone+'&sex='+data.user.sex);
}
export function getLoginUser(data) {
  return post('/user/get', data);
}
export function loginOut() {
  return request('/resource/system/loginOut.do');
}
