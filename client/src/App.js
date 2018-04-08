import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"

import Layout from "./containers/Layout/LoggedLayout"
import HomePage from "./scenes/Home/Home"
import Error404 from "./scenes/Errors/maintenance"

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route component={Error404} />
        </Switch>
      </Layout>
    )
  }
}

export default App
