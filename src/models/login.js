import { routerRedux } from 'dva/router';
import { login } from '../services/login';
export default {
  namespace: 'login',
  state: {
    username:""
  },
  effects: {
    * login ({
      payload,
    },{ put, call, select }) {
      const data = yield call(login, payload);
      if (data.success) {
          window.localStorage.setItem('Giant-Token', data.token);
          yield put(routerRedux.push("/app"))
          // yield put({
          //   type: 'updateState',
          //   payload: {
          //     username: "guonanqing",
          //   },
          // })
      } else {
         throw data.message
      }
    },
  },
  reducers:{
    updateState (state, username) {
      return { ...state, username}
    },
  }
};
