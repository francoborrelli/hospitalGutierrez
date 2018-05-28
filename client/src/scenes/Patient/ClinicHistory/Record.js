import React, {Component} from "react"
import {Route, Switch, withRouter} from "react-router-dom"
import RecordPage from './DetailedRecord/record';
import EditPage from "./components/form"

import hasPermission from '../../../hoc/hasPermission';

class Record extends Component {
  state = {
    loading: true,

    //Mock data
    record: {
      date: "23/06/2018",
      weight: 90,
      height: 23,
      pc: 10,
      ppc: 11,
      vaccination: 0,
      vaccinationObservation: "franco dice hola",
      maduration: 1,
      madurationObservation: "nada que comentar",
      fisicExam: 0,
      fisicExamObservation: "bla bla bla",
      diet: "bien",
      observations: "hrhrtr",
      user: "franco"
    }
  }

  redirect = () => {
    this
      .props
      .history
      .push(this.props.match.url)
  }

  componentDidMount = () => {}

  render() {
    return (
      <Switch>
        <Route
          path={this.props.match.url + "/edit"}
          exact
          render={() => hasPermission(
          <EditPage user={this.props.user} record={this.state.record}/>, ['control_update'])}/>
        <Route
          path={this.props.match.url}
          exact
          render={() => <RecordPage
          user={this.props.user}
          patient={this.props.patient}
          onDelete={this.props.onDeleteRecord}
          record={this.state.record}/>}/>
      </Switch>
    )
  }
}

export default withRouter(Record)
