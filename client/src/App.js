import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"

import Layout from "./containers/Layout/LoggedLayout"
import HomePage from "./scenes/Home/Home"
import LoginPage from "./scenes/Login/Login"
import Error404 from "./scenes/Errors/404"

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" exact component={HomePage} />
          <Route component={Error404} />
        </Switch>
      </Layout>
    )
  }
}

export default App
