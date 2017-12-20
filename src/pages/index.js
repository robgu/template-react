import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ReduxRouter } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import Redux, { reducer as redux } from './Redux';

const reducer = combineReducers({
  redux,
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(createLogger({
      predicate: () => {
        return window.isDebuggingRemotely;
      },
    }))
  )
);

const routes = (
  <Provider store={store}>
    <ReduxRouter >
      <Route />
    </ReduxRouter>
  </Provider>
);

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducer);
  });
}

export {
  routes,
};
