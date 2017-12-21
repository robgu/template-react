import createHistory from 'history/createHashHistory';
import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import Redux, { reducer as redux } from './Redux';
import Rest, { reducer as rest } from './Rest';

const reducer = combineReducers({
  redux,
  rest,
  routing: routerReducer,
});
const history = createHistory();
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(createLogger())
  )
);

const routes = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history} >
        <Switch>
          <Route path="/redux" component={Redux} />
          <Route path="/rest" component={Rest} />
          <Redirect to="/redux" />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducer);
  });
}

export {
  routes,
  store,
};
