import { routerRedux } from 'dva/router';
import { login } from '../services/login';
import {showTip} from "../services/app";
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
          window.localStorage.setItem('userName', payload.name);
          yield put(routerRedux.push("/user"))
          // yield put({
          //   type: 'updateState',
          //   payload: {
          //     username: "guonanqing",
          //   },
          // })
      } else {
        const result = {
          tip: data.msg,
          type: 'error',
        };
        yield call(showTip, result);
      }
    },
    * toRegister ({
      payload,
    }, { call, put }) {
      yield put(routerRedux.push("/register"))
    },
  },
  reducers:{
    updateState (state, username) {
      return { ...state, username}
    },
  }
};
