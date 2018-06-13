import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { message } from 'antd';
import RecordPage from './DetailedRecord/record';
import EditPage from './EditRecord/editRecord';
import axios from '../../../axios-api';

class Record extends Component {
  state = {
    loading: false,
    record: {}
  };

  getURL() {
    return (
      '/patients/' +
      this.props.patient._id +
      '/clinicalRecords/' +
      this.props.match.params.recordId
    );
  }

  componentDidMount() {
    const url = this.getURL();
    axios
      .get(url)
      .then(response => {
        this.setState({ record: response.data });
      })
      .catch(() => message.error('Ocurrio un error. Intenta nuevamente'));
  }

  deleteRecordHandler = () => {
    const url = this.getURL();
    return axios
      .delete(url)
      .then(() => {
        this.props.reload();
        this.props.history.push('/patient/' + this.props.patient._id);
      })
      .catch(() => message.error('Ocurrio un error. Intenta nuevamente'));
  };

  editRecordHandler = () => {};

  render() {
    return (
      <Switch>
        <Route
          path={this.props.match.url + '/edit'}
          exact
          render={() => (
            <EditPage
              user={this.props.user}
              patient={this.props.patient}
              submitted={this.editRecordHandler}
              loading={this.state.loading}
              record={this.state.record}
            />
          )}
        />
        <Route
          path={this.props.match.url}
          exact
          render={() => (
            <RecordPage
              user={this.props.user}
              patient={this.props.patient}
              onDelete={this.deleteRecordHandler}
              record={this.state.record}
            />
          )}
        />
      </Switch>
    );
  }
}

export default withRouter(Record);
