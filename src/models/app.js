import { routerRedux } from 'dva/router'
import { parse } from 'qs'
// import config from 'config'
// import { query, logout } from 'services/app'
import queryString from 'query-string'
// const { prefix } = config

export default {
  namespace: 'app',
  state: {
    collapsed: true,
    user: {},
    permissions: {
      visit: [],
    },
    menuPopoverVisible: false,
    // siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    // darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    // navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {
    // * query ({
    //   payload,
    // }, { call, put, select }) {
    //   debugger
    //   const { success, user } = yield call(query, payload)
    //   const { locationPathname } = yield select(_ => _.app)
    //   if (success && user) {
    //
    //   } else  {
    //     yield put(routerRedux.push({
    //       pathname: '/login',
    //       search: queryString.stringify({
    //         from: locationPathname,
    //       }),
    //     }))
    //   }
    // },

    // * logout ({
    //   payload,
    // }, { call, put }) {
    //   const data = yield call(logout, parse(payload))
    //   if (data.success) {
    //     yield put({ type: 'query' })
    //   } else {
    //     throw (data)
    //   }
    // },
    // * toPath ({payload,}, { call, put }) {
    //   debugger
    //  switch (payload) {
    //    case 1:
    //      yield put(routerRedux.push("/app"));
    //      break;
    //    case 2:
    //      yield put(routerRedux.push("/register"))
    //      break;
    //    default:
    //      yield put(routerRedux.push("/login"))
    //      break;
    //  }
    // },
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};
