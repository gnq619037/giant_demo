import {request, post, get} from '../utils/request';

export function getAllMsg(data) {
  return post('/msg/all',data);
}


