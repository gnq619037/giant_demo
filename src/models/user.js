import { queryUser, deleteUser, updateUser,getLoginUser,loginOut } from '../services/user';
import { routerRedux } from 'dva/router'

export default {
  namespace: 'user',
  state:{
    users:[],
    selectedRowKeys: [],
    loading: true,
    visible:false,
    moduleUser:{},
    filteredInfo: null,
    sortedInfo: null,
    disabled:true,
    loginUser:''
  },
  subscriptions: {
    setupT ({ dispatch }) {
      dispatch({ type: 'query'})
    },
    setup ({ dispatch, history, state }) {
      history.listen((location) => {
        if (location.pathname === '/app') {
          const payload = {'pageNum':1,'pageSize':10}
          dispatch({
            type: 'query',
            payload,
          })
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
        debugger
        if (data.success) {
          debugger
          console.log(data.result);
          yield put({
            type: 'querySuccess',
            payload: {
              users: data.result,
            },
          })
        } else {
          throw data.message
        }
      }
    },
    * loginOut ({
      payload,
    }, { call, put, select }) {
      const data = yield call(loginOut)
      debugger
      if(data.username === ""){
        yield put(routerRedux.push({
          pathname: '/login',
        }))
      }
    },
    * queryUser ({
      payload,
    }, { call, put }) {
      const data = yield call(queryUser, payload)
      const {
        success, message, ...users
      } = data
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            users: users,
          },
        })
      } else {
        throw data.message
      }
    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(deleteUser, { userId: payload })
      if (data.success) {
        const data1 = yield call(queryUser, "")
        debugger
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

    * updateUser ({ payload }, { call, put, select }) {
      debugger
      const data = yield call(updateUser, { user: payload })
      debugger
      if (data.success) {
        const data1 = yield call(queryUser, "")
        debugger
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
  },

  reducers: {
    updateTable (state, { payload }){
      debugger
      return {...state,filteredInfo:payload.filteredInfo,sortedInfo: payload.sortedInfo}
    },

    updateState (state, { payload }) {
      return state.filter(user => user.id !== payload);
    },

    showModal (state, { payload }) {
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
      const {users} = payload
      return {
        ...state,
        users,
      }
    },
  },
};
