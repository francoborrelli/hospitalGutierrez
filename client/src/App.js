import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'

import Layout from './containers/Layout/LoggedLayout';
import HomePage from './scenes/Home/Home';


class App extends Component {
  render() {
    return (
      <Layout>
          <Route path="/" exact component={HomePage}></Route>
      </Layout>
    );
  }
}

export default App;
