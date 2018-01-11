import _ from 'lodash';
import { Component } from 'react';
import * as redux from 'react-redux';
import { routerActions } from 'react-router-redux';
import * as pagan from 'redux-pagan';

let store = null;
let translations = null;

const format = (keys, ...args) => {
  let result = (keys || '').toString();
  for (let i = 0; i < args.length; i++) {
    const reg = new RegExp(`({)${i}(})`, 'g');
    result = result.replace(reg, args[i]);
  }

  return result;
};

export const init = (_store, _translations) => {
  store = _store;
  translations = _translations;

  // eslint-disable-next-line
  loadLang('zh-CN');
};

export const loadLang = (lang) => {
  store.dispatch(pagan.loadLang(lang, () => {
    return translations[lang];
  }));
};

Component.prototype.$i18n = function (path, ...args) {
  const { i18n: { data, locale } } = store.getState();
  const keys = [locale, 'app'];
  if (this.i18nRootPath) {
    keys.push(this.i18nRootPath);
  }

  keys.push(path);
  const key = keys.join('.');

  const value = _.get(data, key);
  if (typeof value === 'string') {
    return format(value, ...args);
  } else if (_.isObject(value)) {
    if (typeof args[0] === 'number') {
      if (args[0] === 1) {
        return value.singular;
      }

      return value.plural;
    }

    return value;
  }

  return value;
};

Component.prototype.$push = (...keys) => {
  return store.dispatch(routerActions.push(...keys));
};

Component.prototype.$replace = (...keys) => {
  return store.dispatch(routerActions.replace(...keys));
};

export const connect = (...args) => {
  const getProps = args.shift(0, 1);

  args.unshift((...params) => {
    const props = (getProps ? getProps(...params) : {}) || {};
    props.dispatch = store.dispatch;
    return props;
  });

  return redux.connect(...args);
};

export const i18n = Component.prototype.$i18n;

export default connect;
