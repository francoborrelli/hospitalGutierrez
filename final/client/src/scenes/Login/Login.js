import React, { Component } from 'react';
import { Card, message } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from './components/loginForm';
import * as actions from '../../store/actions';

const styles = {
  maxWidth: 350,
  margin: '130px auto 0px'
};

class Login extends Component {
  componentDidUpdate() {
    if (this.props.error) {
      if (this.props.error.status === 403) {
        message.error('Su usuario se encuentra bloqueado', 3);
      } else {
        message.error('El email y/o contraseña incorrectos', 3);
      }
    }
  }

  submitHandler = data => {
    this.props.login(data.email, data.password);
  };

  render() {
    return (
      <div className="loginPage">
        {this.props.loggedIn ? <Redirect to="/" /> : null}
        <Card title="Iniciar Sesión" style={styles}>
          <LoginForm
            submitted={this.submitHandler}
            loading={this.props.loading}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.jwt,
  loading: state.auth.loading,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(actions.login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
