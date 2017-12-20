import '~/app.less';

import Engine from '~/engine';
import React, { Component } from 'react';

export default class Main extends Component {
  state = { isReady: false }

  componentDidMount= async () => {
    await Engine.init({

    });

    this.setState({ isReady: true });
  }

  render = () => {
    if (!this.state.isReady) {
      return undefined;
    }

    return (
      <div>Hello, template-react!!!!</div>
    );
  }
}
