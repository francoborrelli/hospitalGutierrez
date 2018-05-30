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
  const Component = props.enabled ? Error401 : Mantainment
  const Home = props.enabled ? HomePage : Mantainment
  return (<VisitorLayout>
  <Switch>
    <Route path="/settings" exact component={Component}/>
    <Route path="/reports" exact component={Component}/>
    <Route path="/users" exact component={Component}/>
    <Route path="/users/add" exact component={Component}/>
    <Route path="/patients" component={Component}/>
    <Route path="/patients/add" component={Component}/>
    <Route path="/patient/:userId" component={Component}/>

    <Route path="/login" exact component={LoginPage}/>
    <Route path="/" exact component={Home}/>
    <Route component={Error404}/>
  </Switch>
</VisitorLayout>)}


const mapStateToProps = state => ({enabled: state.app.enabled});

export default withRouter(connect(mapStateToProps)(visitor))
