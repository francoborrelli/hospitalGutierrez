import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import LoggedLayout from './scenes/App/logged';
import VisitorLayout from './scenes/App/visitor';
import Spinner from './components/spinner/spinner';

import * as actions from './store/actions';

class App extends Component {
  checkPath() {
    const url = this.props.location.pathname;
    return url.endsWith('/') && url !== '/'
      ? (<Redirect to={url.substring(0, url.length - 1)}/>)
      : null;
  }

  render() {
    {
      this.checkPath()
    }
    if (this.props.appLoading) {
      return <Spinner/>
    }
    return this.props.loggedIn
      ? <LoggedLayout user={this.props.user}/>
      : <VisitorLayout/>
  }
}

const mapStateToProps = state => ({loggedIn: state.auth.jwt, user: state.auth.user, appLoading: state.auth.appLoading});

export default withRouter(connect(mapStateToProps)(App));
