import {request, post} from '../utils/request';
import 'whatwg-fetch'
// import {config} from '../utils/config'
// const { api } = config
// const { userLogin } = api

// export function login (data) {
//   var result = fetch(''+'/resource/system/login.do?username='+data.userName+'&password='+data.password, {
//        credentails: 'include',
//        mode: "cors",
//        headers: {
//            'Accept': 'application/json, text/plain, */*',
//            'Content-Type': 'application/x-www-form-urlencoded'
//        }
//    })
//    return result;
// }

export function login(data) {
  return post('/user/login', data);
}
