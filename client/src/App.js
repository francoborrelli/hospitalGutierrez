import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"

import Layout from "./containers/Layout/LoggedLayout"
import HomePage from "./scenes/Home/Home"
import LoginPage from "./scenes/Login/Login"
import PatientsListPage from "./scenes/Patients/PatientsList/PatientsList"
import UsersListPage from "./scenes/Users/UsersList/UsersList"
import AddPatientPage from "./scenes/Patients/AddPatient/AddPatient"
import ConfigurationPage from "./scenes/Configuration/Configuration"
import ReportsPage from "./scenes/Reports/Reports"
import AddUserPage from "./scenes/Users/AddUser/AddUser"
import Error404 from "./scenes/Errors/404"

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/patients/add" exact component={AddPatientPage} />
          <Route path="/patients" component={PatientsListPage} />
          <Route path="/users/add" component={AddUserPage} />
          <Route path="/users" component={UsersListPage} />
          <Route path="/settings" component={ConfigurationPage} />
          <Route path="/reports" component={ReportsPage} />
          <Route path="/" exact component={HomePage} />
          <Route component={Error404} />
        </Switch>
      </Layout>
    )
  }
}

export default App
