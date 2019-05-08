import React from 'react';
import { Router, Route, Redirect, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import Base from './routes/base';
import Error from './routes/Error';
import App from './routes/App';
import Login from './routes/Login';
// import User from './routes/User';
import dynamic from 'dva/dynamic'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
};

// function RouterConfig({ history, app, login }) {
  // const routes = [
    // {
    //   path: '/',
    //   component: App,
    //   getIndexRoute(nextState, cb) {
    //     require.ensure([], (require) => {
    //       registerModel(app, require('./models/user'));
    //       cb(null, { component: require('./routes/User') });
    //     }, 'user');
    //   },
    //   childRoutes:[
    //     {
    //       path: 'user',
    //       getComponent(nextState, cb) {
    //         require.ensure([], (require) => {
    //           registerModel(app, require('./models/user'));
    //           cb(null, require('./routes/User'));
    //         }, 'user');
    //       },
    //     },{
    //       path: 'relation',
    //       getComponent(nextState, cb) {
    //         require.ensure([], (require) => {
    //           registerModel(app, require('./models/relation'));
    //           cb(null, require('./routes/Relation'));
    //         }, 'relation');
    //       },
    //     },
    //   ]
    // },
    // {
    //   path: '/',
    //   component: Login,
    //   childRoutes: [
    //     {
    //       path: '/login',
    //       component: Login,
    //     },
    //   ],
    // },
  // ];
//   return <Router history={history} routes={routes} />;
// }

function RouterConfig({ history, app, login }) {
  const User = dynamic({
    app,
    models: () => [ import('./models/user') ],
    component: () => import('./routes/User'),
  });
  const Register = dynamic({
    app,
    models: () => [ import('./models/register') ],
    component: () => import('./routes/Register'),
  });
  const Relation = dynamic({
    app,
    models: () => [ import('./models/relation') ],
    component: () => import('./routes/Relation'),
  });
  const App = dynamic({
    app,
    models: () => [ import('./models/user') ],
    component: () => import('./routes/App'),
  });
  return (
     <Router history={history}>
       <Switch>
         <Route exact path="/" render={() => (<Redirect to="/login" />)} />
         {/*<Route path="/products" exact component={Products} render={() => (<Redirect to="/login" />)} />*/}
         <Route path="/login" exact component={Login} render={() => (<Redirect to="/login" />)} />
         {/*<Route path="/user" exact component={User} render={() => (<Redirect to="/login" />)} />*/}
         <Route path="/register" exact component={Register} render={() => (<Redirect to="/register" />)} />
         <Route path="/relation" exact component={Relation} />
         <Route
           path="/user"
           exact
           component={App}>
         </Route>

         <Route path="/*" exact component={Error}/>
       </Switch>
     </Router>
  );
}
export default RouterConfig;
