import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import Redux, { reducer as redux } from './Redux';
import Rest, { reducer as rest } from './Rest';

// const reducer = combineReducers({
//   redux,
//   rest,
//   routing: routerReducer,
// });

// const store = createStore(reducer,
//   // compose(
//   //   applyMiddleware(thunk),
//   //   applyMiddleware(createLogger({
//   //     predicate: () => {
//   //       return window.isDebuggingRemotely;
//   //     },
//   //   }))
//   // )
// );

// const history = syncHistoryWithStore(browserHistory, store);

const routes = () => {
  return (
    // <Provider store={store}>
    <HashRouter /* history={history}*/>
      <Switch>
        <Route path="/redux" component={Redux} />
        <Route path="/rest" component={Rest} />
        <Redirect to="/redux" />
      </Switch>
    </HashRouter>
    // </Provider>
  );
};

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducer);
  });
}

export {
  routes,
  // store,
};
