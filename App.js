import React, {Component} from 'react';
import Router from './src/router/index'

import {
  createStackNavigator,
} from 'react-navigation';

export default class App extends Component {
  render() {
    return (
        <Router />
    );
  }
}


