import { queryUser, deleteUser, updateUser,getLoginUser,loginOut,findAllCity,addFriend } from '../services/user';
import {getAllMsg} from "../services/message";
import { routerRedux } from 'dva/router'
import {showTip, showMsg} from "../services/app";

export default {
  namespace: 'user',
  state:{
    users:[],
    cities:[],
    selectedRowKeys: [],
    loading: true,
    visible:false,
    moduleUser:{},
    filteredInfo: null,
    sortedInfo: null,
    disabled:true,
    loginUser:'',
    reload:true
  },
  subscriptions: {
    setupT ({ dispatch }) {
      // const payload = {'pageNum':1,'pageSize':10}
      // dispatch({ type: 'query', payload});
      dispatch({ type: 'getAllCity'});
    },
    setup ({ dispatch, history, state }) {
      history.listen((location) => {
        if (location.pathname === '/user') {
          // const payload = {'pageNum':1,'pageSize':10}
          // dispatch({
          //   type: 'query',
          //   payload,
          // })
          const payload = {'userId': '1'}
          dispatch({ type: 'getAllMsg', payload});
        }
      })
    },
  },
  effects: {
    * query ({
      payload,
    }, { call, put, select }) {
      const param = {'token':window.localStorage.getItem('Giant-Token')}
      console.log(param);
      const data = yield call(getLoginUser, param)
      if(!data.success){
        yield put(routerRedux.push({
          pathname: '/login',
        }))
      } else {
        const data = yield call(queryUser, payload)
        // const {
        //   success, message, ...result
        // } = data
        console.log(data.result);
        if (data.success) {
          console.log(data.result);
          yield put({
            type: 'querySuccess',
            payload: {
              users: data.result,
            },
          })
        } else {
          const result = {
            tip: data.msg,
            type: 'error',
          };
          yield call(showTip, result);
        }
      }
    },
    * loginOut ({
      payload,
    }, { call, put, select }) {
      const param = {'token':window.localStorage.getItem('Giant-Token')}
      const data = yield call(loginOut, param);
      if(data.success){
        yield put(routerRedux.push({
          pathname: '/login',
        }))
      }
    },
    * getAllMsg ({
                  payload,
                }, { call, put, select }) {
      const data = yield call(getAllMsg, payload);
      if(data.success){
        for(let i = 0; i < data.result.length; i ++){
          // if(data.result[i].msgType === 1){
            const result = {
              tip: data.result[i].msgContent,
              type: data.result[i].msgType,
            };
            yield call(showMsg, result, 5);
          // }
        }
      }
    },
    * addFriend ({
                   payload,
                 }, { call, put, select }) {
      const data = yield call(addFriend, payload);
      if(data.success){

      }
    },
    * toPath ({payload,}, { call, put }) {
      debugger
      switch (payload) {
        case '1':
          yield put(routerRedux.push("/user"));
          break;
        case '2':
          yield put(routerRedux.push("/relation"))
          break;
        default:
          yield put(routerRedux.push("/login"))
          break;
      }
    },
    * queryUser ({
      payload,
    }, { call, put }) {
      const data = yield call(queryUser, payload)
      // const {
      //   success, message, ...users
      // } = data
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            users: data.result,
          },
        })
      } else {
        const result = {
          tip: data.msg,
          type: 'error',
        };
        yield call(showTip, result);
      }
    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(deleteUser, payload)
      if (data.success) {
        const data1 = yield call(queryUser, {"pageSize": 10, "pageNum": 0})
        if (data1.success) {
          yield put({
            type: 'querySuccess',
            payload: {
              users: data1.result,
            },
          })
        }
      } else {
        throw data
      }
    },

    * updateUser ({ payload }, { call, put, select }) {
      debugger
      const data = yield call(updateUser, { user: payload })
      debugger
      if (data.success) {
        const data1 = yield call(queryUser, "")
        const {
          success, message, ...users
        } = data1
        if (data1.success) {
          yield put({
            type: 'querySuccess',
            payload: {
              users: users,
            },
          })
        }
      } else {
        throw data
      }
    },
    * getAllCity ({ payload }, { call, put, select }) {
      const data = yield call(findAllCity)
      if (data.success) {
        const cities = [];
        for(let i = 0; i < data.result.length; i ++){
          const children = [];
          if(data.result[i].cityDTO.length !== 0) {
            for(let j = 0; j < data.result[i].cityDTO.length; j ++) {
              const area = [];
              if(data.result[i].cityDTO[j].cityDTO.length !== 0){
                for(let m = 0; m < data.result[i].cityDTO[j].cityDTO.length; m ++){
                  area.push({
                    'value': data.result[i].cityDTO[j].cityDTO[m].cityName,
                    'label': data.result[i].cityDTO[j].cityDTO[m].cityName,
                  })
                }
              }
              children.push({
                'value': data.result[i].cityDTO[j].cityName,
                'label': data.result[i].cityDTO[j].cityName,
                'children': area,
              })
            }

          }
          cities.push({
            'value': data.result[i].cityName,
            'label': data.result[i].cityName,
            'children': children
          })
        }
        yield put({
          type: 'querySuccess',
          payload: {
            cities,
          },
        })
      } else {

      }
    },
  },

  reducers: {
    updateTable (state, { payload }){
      return {...state,filteredInfo:payload.filteredInfo,sortedInfo: payload.sortedInfo}
    },

    // updateState (state, { payload }) {
    //   return state.filter(user => user.id !== payload);
    // },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    showModal (state, { payload }) {
      debugger
      const moduleUser = {userId:payload.userId,
        name:payload.userName,
        password:payload.password,
        telPhone:payload.telPhone,
        birth:payload.birth,
        age:payload.age,
        sex:payload.sex}
      return { ...state, ...payload, moduleUser, visible: true, showModal:payload.showModal }
    },
    hideModal (state) {
      const moduleUser = {userId:"",
        name:"",
        password:"",
        telPhone:"",
        birth:"",
        age:"",
        sex:""}
      return { ...state,moduleUser,  visible: false }
    },
    // updateUser (state) {
    //   return { ...state, visible: false }
    // },
    querySuccess (state, { payload }) {
      // const {users} = payload
      // console.log(users);
      return {
        ...state,
        ...payload,
      };
      // return {
      //   ...state,
      //   users,
      // }
    },
  },
};
