import React, {Fragment} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import LoggedLayout from '../../containers/Layout/LoggedLayout';

import EditUserPage from '../Users/EditUser/EditUser';
import AddUserPage from '../Users/AddUser/AddUser';
import HomePage from '../Home/Home';
import LoginPage from '../Login/Login';
import PatientPage from '../Patient/Patient';
import AddPatientPage from '../Patients/AddPatient/AddPatient';
import PatientsListPage from '../Patients/PatientsList/PatientsList';
import UsersListPage from '../Users/UsersList/UsersList';
import ReportsPage from '../Reports/Reports';
import ConfigurationPage from '../Configuration/Configuration';
import Error404 from '../Errors/404';
import Mantainment from '../Errors/maintenance';

const logged = props => {

  const Patient = props.enabled ? PatientPage : Mantainment
  const AddPatient = props.enabled ? PatientPage : Mantainment
  const Patients = props.enabled ? PatientsListPage : Mantainment
  const EditUser = props.enabled ? EditUserPage : Mantainment
  const AddUser = props.enabled ? AddUserPage : Mantainment
  const Reports = props.enabled ? ReportsPage : Mantainment
  const Users = props.enabled ? UsersListPage : Mantainment
  const Home = props.enabled ? HomePage: Mantainment

  return (
    <LoggedLayout>
      <Switch>
        <Route
          path="/settings"
          exact
          render={() => <ConfigurationPage user={props.user}/>}/>
        <Route path="/login" exact component={LoginPage}/>
        <Route path="/patient/:patientId" render={() => <Patient user={props.user}/>}/>
        <Route
          path="/patients/add"
          exact
          render={() => <AddPatient user={props.user}/>}/>
        <Route path="/patients" exact render={() => <Patients user={props.user}/>}/>
        <Route
          path="/user/:userId/edit"
          exact
          render={() => <EditUserPage user={props.user}/>}/>
        <Route path="/users/add" exact render={() => <AddUser user={props.user}/>}/>
        <Route path="/users" exact render={() => <Users user={props.user}/>}/>
        <Route path="/reports" exact render={() => <Reports user={props.user}/>}/>
        <Route path="/login" exact component={LoginPage}/>
        <Route path="/" exact component={Home}/>
        <Route component={Error404}/>
      </Switch>
    </LoggedLayout>
  )
};

const mapStateToProps = state => ({enabled: state.app.enabled});

export default withRouter(connect(mapStateToProps)(logged))
