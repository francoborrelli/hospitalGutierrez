import React from 'react';
import { Route, Switch } from 'react-router-dom';

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

export default props => (
  <LoggedLayout>
    <Switch>
      <Route
        path="/patient/:patientId"
        render={() => <PatientPage user={props.user} />}
      />
      <Route
        path="/patients/add"
        exact
        render={() => <AddPatientPage user={props.user} />}
      />
      <Route
        path="/patients"
        exact
        render={() => <PatientsListPage user={props.user} />}
      />
      <Route
        path="/user/:userId/edit"
        exact
        render={() => <EditUserPage user={props.user} />}
      />
      <Route
        path="/users/add"
        exact
        render={() => <AddUserPage user={props.user} />}
      />
      <Route
        path="/users"
        exact
        render={() => <UsersListPage user={props.user} />}
      />
      <Route
        path="/settings"
        exact
        render={() => <ConfigurationPage user={props.user} />}
      />
      <Route
        path="/reports"
        exact
        render={() => <ReportsPage user={props.user} />}
      />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/" exact component={HomePage} />
      <Route component={Error404} />
    </Switch>
  </LoggedLayout>
);
