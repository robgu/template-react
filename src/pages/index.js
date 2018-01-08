import createHistory from 'history/createHashHistory';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import CommonLayout from './CommonLayout';
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
    applyMiddleware(createLogger({
      predicate: () => {
        // eslint-disable-next-line
        return process.env.ENV !== 'production' || localStorage.debug;
      },
    }))
  )
);

const routes = {
  '/redux': {
    iconType: 'pie-chart',
    title: 'Redux Demo',
    component: Redux,
  },
  '/rest': {
    iconType: 'desktop',
    title: 'Rest Demo',
    component: Rest,
  },
  '/group1': {
    iconType: 'pie-chart',
    title: 'Group1',
    items: {
      '/redux': {
        iconType: 'pie-chart',
        component: Redux,
        title: 'Redux Demo',
        group: 'group1',
      },
      '/rest': {
        iconType: 'desktop',
        component: Rest,
        title: 'Rest Demo',
        group: 'group1',
      },
    },
  },
};

export default class Pages extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history} >
          <CommonLayout store={store} routes={routes} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducer);
  });
}
