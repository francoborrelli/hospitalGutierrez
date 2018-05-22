import React, {Component} from "react"
import {Route, Switch} from "react-router-dom"

import ProfilePage from "./Profile/Profile"
import AddRecordPage from './ClinicHistory/AddRecord/AddRecord';
import RecordPage from "./ClinicHistory/Record"
import Error404 from "../Errors/404"

class PatientPage extends Component {
  state = {
    loading: true,

    //Mock data
    patient: {
      name: "Franco",
      lastname: "Borrelli",
      documentType: "DNI",
      documentNumber: "39831178",
      age: "5 meses",
      visits: "53",
      birthday: "27/08/1996",
      gender: "Másculino",
      adress: "11 1419, La Plata, Buenos Aires",
      houseType: "Choza",
      waterType: "Pozo",
      heatType: "Estufa"
    }
  }

  componentDidMount = () => {}

  render() {
    return (
      <Switch>
        <Route
          path={this.props.match.url + '/addRecord'}
          render={() =>< AddRecordPage patient = {this.state.patient} />}
          />
        <Route
          path={this.props.match.url + '/:recordId'}
          render={() =>< RecordPage patient = {this.state.patient} />}
          />
        <Route
          path={this.props.match.url}
          exact
          render={() =>< ProfilePage patient = {this.state.patient} />}
          />
        <Route component={Error404}/>
      </Switch>
    )
  }
}

export default PatientPage
