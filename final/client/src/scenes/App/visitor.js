import React from "react"
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from "react-redux"

import VisitorLayout from "../../containers/Layout/visitorLayout"

import HomePage from '../Home/Home';
import Error404 from '../Errors/404';
import Error401 from '../Errors/401';
import Mantainment from "../Errors/maintenance"
import LoginPage from '../Login/Login';

const visitor = props => {
  const Home = props.enabled ? HomePage : Mantainment
  return (<VisitorLayout>
  <Switch>
    <Route path="/settings" exact component={Error401}/>
    <Route path="/reports" exact component={Error401}/>
    <Route path="/users" exact component={Error401}/>
    <Route path="/users/add" exact component={Error401}/>
    <Route path="/patients" component={Error401}/>
    <Route path="/patients/add" component={Error401}/>
    <Route path="/patient/:userId" component={Error401}/>

    <Route path="/login" exact component={LoginPage}/>
    <Route path="/" exact component={Home}/>
    <Route component={Error404}/>
  </Switch>
</VisitorLayout>)}


const mapStateToProps = state => ({enabled: state.app.enabled});

export default withRouter(connect(mapStateToProps)(visitor))
