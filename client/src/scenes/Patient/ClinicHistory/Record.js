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

  componentDidMount() {
    const url =
      '/patients/' +
      this.props.patient._id +
      '/clinicalRecords/' +
      this.props.match.params.recordId;

    axios
      .get(url)
      .then(response => {
        this.setState({record: response.data})
      })
      .catch(() => message.error('Ocurrio un error. Intenta nuevamente'));
  }

  redirect = () => {
    this.props.history.push(this.props.match.url);
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
              onDelete={this.props.onDeleteRecord}
              record={this.state.record}
            />
          )}
        />
      </Switch>
    );
  }
}

export default withRouter(Record);
