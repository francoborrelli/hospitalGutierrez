import React, { Component } from 'react';
import { message } from 'antd';
import RecordForm from '../components/form';
import { withRouter } from 'react-router-dom';
import axios from '../../../../axios-api';

class AddRecord extends Component {
  state = {
    loading: false
  };

  redirect = () => {
    this.props.history.push('/patient/' + this.props.patient._id);
  };

  submitHandler = data => {
    this.setState({ loading: true });
    const url = '/patients/' + this.props.patient._id + '/clinicalRecords';
    const result = {
      ...data,
      user: this.props.user._id
    };
    axios
      .post(url, result)
      .then(() => {
        this.props.reload();
        this.redirect();
        message.success(
          'Se agregó el control correctamente.'
        );
      })
      .catch(() => {
        message.error('Ocurrió un error. Intenta nuevamente.');
      });
    this.setState({ loading: false });
  };

  render() {
    return (
      <RecordForm
        onCancel={this.redirect}
        submit={this.submitHandler}
        loading={this.state.loading}
        title="Nuevo Control"
      />
    );
  }
}

export default withRouter(AddRecord);
