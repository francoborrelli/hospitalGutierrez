import React from "react"

import {Route, Switch} from 'react-router-dom';

import VisitorLayout from "../../containers/Layout/visitorLayout"

import HomePage from '../Home/Home';
import Error404 from '../Errors/404';
import LoginPage from '../Login/Login';

export default props => <VisitorLayout>
  <Switch>
    <Route path="/login" exact component={LoginPage}/>
    <Route path="/" exact component={HomePage}/>
    <Route component={Error404}/>
  </Switch>
</VisitorLayout>
