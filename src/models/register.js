import {addUser, findAllCity, loginOut} from '../services/user';
import {showTip} from "../services/register";
import { routerRedux } from 'dva/router'

export default {
  namespace: 'register',
  state:{
    cities:[]
    // users:[],
    // selectedRowKeys: [],
    // loading: true,
    // visible:false,
    // moduleUser:{},
    // filteredInfo: null,
    // sortedInfo: null,
    // disabled:true,
    // loginUser:''
  },
  subscriptions: {
    setupT ({ dispatch }) {
      dispatch({ type: 'query'})
    },
    setup ({ dispatch, history, state }) {
      history.listen((location) => {
        if (location.pathname === '/register') {
          const payload = {'pageNum':1,'pageSize':10}
          dispatch({
            type: 'getAllCity',
            payload,
          })
        }
      })
    },
  },
  effects: {
    * toLogin ({
      payload,
    },{ put, call, select }) {
      yield put(routerRedux.push("/login"))
    },
    * registerUser ({
                 payload,
               },{ put, call, select }) {
      const data = yield call(addUser, payload);
      if(data.success){
        yield put(routerRedux.push("/login"))
      } else {
        const result = {
          tip: data.msg,
          type: 'error',
        };
        yield call(showTip, result);
      }
    },
    * getAllCity ({ payload }, { call, put, select }) {
      const data = yield call(findAllCity)
      if (data.success) {
        const cities = [];
        for(let i = 0; i < data.result.length; i ++){
          const children = [];
          if(data.result[i].cityDTO.length !== 0) {
            // for(let j = 0; j < data.result.cityDTO.cityDTO.length; j ++){
            //   if(data.result.cityDTO.cityDTO.)
            // }
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
        debugger
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
    // updateTable (state, { payload }){
    //   debugger
    //   return {...state,filteredInfo:payload.filteredInfo,sortedInfo: payload.sortedInfo}
    // },
    //
    // updateState (state, { payload }) {
    //   return state.filter(user => user.id !== payload);
    // },
    //
    // showModal (state, { payload }) {
    //   debugger
    //   const moduleUser = {userId:payload.userId,
    //     name:payload.userName,
    //     password:payload.password,
    //     telPhone:payload.telPhone,
    //     birth:payload.birth,
    //     age:payload.age,
    //     sex:payload.sex}
    //   return { ...state, ...payload, moduleUser, visible: true, showModal:payload.showModal }
    // },
    // hideModal (state) {
    //   const moduleUser = {userId:"",
    //     name:"",
    //     password:"",
    //     telPhone:"",
    //     birth:"",
    //     age:"",
    //     sex:""}
    //   return { ...state,moduleUser,  visible: false }
    // },
    // // updateUser (state) {
    // //   return { ...state, visible: false }
    // // },
    // querySuccess (state, { payload }) {
    //   const {users} = payload
    //   debugger
    //   // console.log(users);
    //   return {
    //     ...state,
    //     ...payload,
    //   };
    //   // return {
    //   //   ...state,
    //   //   users,
    //   // }
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
