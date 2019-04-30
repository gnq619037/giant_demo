import './index.css';

import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory';
// import 'babel-polyfill';
// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  // history: browserHistory(),
  onError (error) {
    message.error(error.message)
  },
   history: createHistory(),
 });

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
// app.model(require('./models/products').default);
app.model(require('./models/login').default);
// app.model(require('./models/app').default);
// app.model(require('./models/user').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
