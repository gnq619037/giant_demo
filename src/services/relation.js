import {request, post, get} from '../utils/request';

export function queryRelationUser(data) {
  return post('/graph/user/relation/users',data);
}


