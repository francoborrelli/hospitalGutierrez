import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LoggedLayout from './containers/Layout/LoggedLayout';
import VisitorLayout from './containers/Layout/visitorLayout';

import HomePage from './scenes/Home/Home';
import LoginPage from './scenes/Login/Login';

import PatientPage from './scenes/Patient/Patient';
import AddPatientPage from './scenes/Patients/AddPatient/AddPatient';
import PatientsListPage from './scenes/Patients/PatientsList/PatientsList';

import UsersListPage from './scenes/Users/UsersList/UsersList';
import AddUserPage from './scenes/Users/AddUser/AddUser';
import EditUserPage from './scenes/Users/EditUser/EditUser';

import ReportsPage from './scenes/Reports/Reports';
import ConfigurationPage from './scenes/Configuration/Configuration';

import Error404 from './scenes/Errors/404';

class App extends Component {
  render() {
    const Layout = this.props.loggedIn ? LoggedLayout : VisitorLayout;

    return (
      <Layout>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/patient/:patientId(\d+)" component={PatientPage} />
          <Route path="/patients/add" exact component={AddPatientPage} />
          <Route path="/patients" component={PatientsListPage} />
          <Route path="/user/:userId(\d+)/edit" component={EditUserPage} />
          <Route path="/users/add" component={AddUserPage} />
          <Route path="/users" component={UsersListPage} />
          <Route path="/settings" component={ConfigurationPage} />
          <Route path="/reports" component={ReportsPage} />
          <Route path="/" exact component={HomePage} />
          <Route component={Error404} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.jwt
});

export default withRouter(connect(mapStateToProps)(App));
