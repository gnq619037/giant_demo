import {request, post, get} from '../utils/request';

export function queryUser(data) {
  return post('/user/get/all',data);
}
export function addUser(data) {
  return post('/user/add', data);
}
export function deleteUser(data) {
  return post('/user/delete', data);
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
export function loginOut(data) {
  return post('/user/logout', data);
}

export function findAllCity(){
  return get('/city/all');
}

export function addFriend(data) {
  return post('/graph/user/relation/family', data);
}

export function getGraphUser(data) {
  return post('/graph/user/get', data);
}
