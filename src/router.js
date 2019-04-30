import React from 'react';
import { Router, Route, Redirect, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import Products from './routes/Products';

import Error from './routes/Error';
// import App from './routes/App';
import Login from './routes/Login';
// import User from './routes/User';
import dynamic from 'dva/dynamic'


function RouterConfig({ history, app, login }) {
  const User = dynamic({
    app,
    models: () => [ import('./models/user') ],
    component: () => import('./routes/User'),
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
         <Route path="/products" exact component={Products} render={() => (<Redirect to="/login" />)} />
         <Route path="/login" exact component={Login} render={() => (<Redirect to="/login" />)} />
         <Route path="/user" exact component={User} render={() => (<Redirect to="/login" />)} />
         <Route path="/app" exact component={App}
     //     render={props => (
     //       (login.username !== '') ? (
     //        <Redirect to="/app" />
     //       ) : (
     //    <Redirect to="/login" />
     //   )
     // )}
   />
         <Route path="/*" exact component={Error}/>
       </Switch>
     </Router>
  );
}

export default RouterConfig;
