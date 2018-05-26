import React from "react"
import {Route, Switch} from 'react-router-dom';

import LoggedLayout from '../../containers/Layout/LoggedLayout';

import EditUserPage from "../Users/EditUser/EditUser";
import AddUserPage from "../Users/AddUser/AddUser";
import HomePage from '../Home/Home';
import LoginPage from '../Login/Login';
import PatientPage from '../Patient/Patient';
import AddPatientPage from '../Patients/AddPatient/AddPatient';
import PatientsListPage from '../Patients/PatientsList/PatientsList';
import UsersListPage from '../Users/UsersList/UsersList';
import ReportsPage from '../Reports/Reports';
import ConfigurationPage from '../Configuration/Configuration';
import Error404 from '../Errors/404';

export default props => <LoggedLayout>
  <Switch>
    <Route path="/patient/:patientId" component={PatientPage}/>
    <Route path="/patients/add" exact component={AddPatientPage}/>
    <Route path="/login" exact component={LoginPage}/>
    <Route
      path="/patients"
      exact
      render={() => <PatientsListPage user={this.props.user}/>}/>
    <Route
      path="/user/:userId/edit"
      exact
      render={() => <EditUserPage user={this.props.user}/>}/>
    <Route
      path="/users/add"
      exact
      render={() => <AddUserPage user={this.props.user}/>}/>
    <Route
      path="/users"
      exact
      render={() => <UsersListPage user={this.props.user}/>}/>
    <Route path="/settings" exact component={ConfigurationPage}/>
    <Route path="/reports" exact component={ReportsPage}/>
    <Route path="/" exact component={HomePage}/>
    <Route component={Error404}/>
  </Switch>
</LoggedLayout>
