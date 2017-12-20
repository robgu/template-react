import _ from 'lodash';

import Rest from './Rest';
import Sessions from './Sessions';

const debug = require('debug')('template-react/Engine');
// eslint-disable-next-line
const { error } = console;

const defaultOption = {
  onLogin: () => { error('onLogin is required'); },
  i18n: () => { error('i18n is required'); },
  showToast: () => { error('showToast is required'); },
  showLoading: () => { error('showLoading is required'); },
  hideLoading: () => { error('hideLoading is required'); },
  storage: {
    getItem: () => { error('storage.getItem is required'); },
    setItem: () => { error('storage.setItem is required'); },
    removeItem: () => { error('storage.removeItem is required'); },
    clear: () => { error('storage.clear is required'); },
  },
};

export default class Engine {
  static init = async (option) => {
    try {
      Engine.option = _.merge(defaultOption, option);
      await Sessions.init(option.params);
      Rest.init();
      if (option.onInitSuccess) {
        option.onInitSuccess();
      }
    } catch (err) {
      debug.log(err);
      if (option.onInitFailure) {
        option.onInitFailure(err);
      }
    }
  }

  static login = async () => {
    await Engine.option.onLogin();
  }

  static i18n = (key, ...args) => {
    return Engine.option.i18n(key, args);
  }

  static showToast = (options) => {
    Engine.option.showToast(options);
  }

  static showLoading = () => {
    Engine.option.showLoading();
  }

  static hideLoading = () => {
    Engine.option.hideLoading();
  }

  static getItem = (key, { isTemporary } = {}) => {
    return Engine.option.storage.getItem(key, isTemporary);
  }

  static setItem = (key, value, { isTemporary } = {}) => {
    return Engine.option.storage.setItem(key, value, isTemporary);
  }

  static removeItem = (key, { isTemporary } = {}) => {
    return Engine.option.storage.removeItem(key, isTemporary);
  }

  static clear = ({ isTemporary } = {}) => {
    return Engine.option.storage.clear(isTemporary);
  }
}
