import '~/app.less';

import Engine from '~/engine';
import { routes } from '~/pages';
import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Main extends Component {
  state = { isReady: false }

  componentDidMount= async () => {
    try {
      await Engine.init({});

      this.setState({ isReady: true });
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }

  render = () => {
    if (!this.state.isReady) {
      return undefined;
    }

    return routes;
  }
}

render(
  React.createElement(require('./pages').default),
  document.getElementById('root'),
);
