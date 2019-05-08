import {queryRelationUser} from '../services/relation';
import {getGraphUser} from '../services/user';
import {showTip} from "../services/app";
import { routerRedux } from 'dva/router'

export default {
  namespace: 'relation',
  state:{
    cities:[],
    userRelationData:[],
    userNodeDate:[]
  },
  subscriptions: {
    setupT ({ dispatch }) {
      // dispatch({ type: 'query'})
    },
    setup ({ dispatch, history, state }) {
      history.listen((location) => {
        if (location.pathname === '/relation') {
          dispatch({
            type: 'query',
          })
        }
      })
    },
  },
  effects: {
    * query ({
               payload,
             }, { call, put, select }) {
      payload = {'userName':  window.localStorage.getItem('userName')}
      const data = yield call(queryRelationUser, payload)
      console.log(data);
      if(data.success){
        const userNodeData = [];
        for(let i = 0; i < data.result.length; i++){
          userNodeData.push({
            'id': data.result[i].id,
            'label':data.result[i].userName
          });
        }
        yield put({
          type: 'updateState',
          payload: {
            userNodeData
          },
        })
      } else {

      }
    },

    * getGraphUser ({
                      payload,
                    }, { call, put, select }) {
      payload = {'userName':  window.localStorage.getItem('userName')}
      const data = yield call(getGraphUser, payload)
      console.log(data);
      if(data.success){

      } else {

      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
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
