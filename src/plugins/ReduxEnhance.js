import _ from 'lodash';
import * as redux from 'react-redux';
import { routerActions } from 'react-router-redux';
import * as pagan from 'redux-pagan';

let store = null;
let translations = null;
const cachedI18n = {};

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


export const getLang = () => {
  const i18nState = store.getState().i18n;
  if (cachedI18n[i18nState.locale]) {
    return cachedI18n[i18nState.locale];
  }

  // 第一个 key 一定是 app，写在这里后其它地方可以省略，同时起到缓存作用
  const originalI18n = pagan.getLang(i18nState, 'app');
  cachedI18n[i18nState.locale] = (...args) => {
    const lastArg = args[args.length - 1];
    if (_.isArray(lastArg)) {
      args.pop();
      return format(originalI18n(...args), ...lastArg);
    } else if (_.isNumber(lastArg)) {
      args.pop();
      if (lastArg === 1) {
        args.push('singular');
      } else {
        args.push('plural');
      }

      return originalI18n(...args).s;
    }

    return originalI18n(...args).s;
  };

  return cachedI18n[i18nState.locale];
};

export const i18n = (...args) => {
  return getLang()(...args);
};

export const connect = (...args) => {
  const getProps = args.shift(0, 1);

  args.unshift((...params) => {
    const props = (getProps ? getProps(...params) : {}) || {};
    props.i18n = getLang();
    props.dispatch = store.dispatch;
    props.push = (...keys) => {
      return store.dispatch(routerActions.push(...keys));
    };
    props.replace = (...keys) => {
      return store.dispatch(routerActions.replace(...keys));
    };

    return props;
  });

  return redux.connect(...args);
};

export default connect;
