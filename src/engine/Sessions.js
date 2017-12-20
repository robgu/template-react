import Engine from './Engine';

export default class Sessions {
  static option = {};
  static _schema = {
    token: {},
    language: {},
  }

  static init = (option) => {
    Sessions.option = Sessions._restore(option);
  }

  static clear = () => {
    Sessions.option.token = undefined;
  }

  static _restore = (params) => {
    const option = { $data: {} };
    const config = {};
    for (const [key, op] of Object.entries(Sessions._schema)) {
      Object.defineProperty(option, key, {
        set(newValue) {
          option.$data[key] = newValue;
          Engine.setItem(key, newValue, op);
        },
        get() {
          return option.$data[key];
        },
      });

      config[key] = Engine.getItem(key, op);
    }

    Object.assign(option, config, params);

    return option;
  }
}
