import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
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

import * as actions from './store/actions';

class App extends Component {
  checkPath() {
    const url = this.props.location.pathname;
    return url.endsWith('/') && url !== '/' ? (
      <Redirect to={url.substring(0, url.length - 1)} />
    ) : null;
  }

  render() {
    const Layout = this.props.loggedIn ? LoggedLayout : VisitorLayout;

    return (
      <Layout>
        {this.checkPath()}
        <Switch>

          <Route path="/patient/:patientId(\d+)" component={PatientPage}/>
          <Route path="/patients/add" exact component={AddPatientPage}/>
          <Route
            path="/patients"
            exact
            render={() => < PatientsListPage user = {
            this.props.user
          } />}/>

          <Route path="/user/:userId(\d+)/edit" exact component={EditUserPage}/>
          <Route path="/users/add" exact component={AddUserPage}/>

          <Route
            path="/users"
            exact
            render={() => < UsersListPage user = {
            this.props.user
          } />}/>

          <Route path="/settings" exact component={ConfigurationPage}/>
          <Route path="/reports" exact component={ReportsPage}/>
          <Route path="/" exact component={HomePage}/>
          <Route component={Error404}/>
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({loggedIn: state.auth.jwt, user: state.auth.user});

export default withRouter(connect(mapStateToProps)(App));
