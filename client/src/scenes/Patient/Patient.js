import React, {Component} from "react"
import {Route, Switch} from "react-router-dom"
import moment from "moment"
import Section from "./components/patientHeader"
import ProfilePage from "./Profile/Profile"
import AddRecordPage from "./ClinicHistory/AddRecord/AddRecord"
import EditPatientPage from "../Patients/EditPatient/EditPatient"
import RecordPage from "./ClinicHistory/Record"

class PatientPage extends Component {
  state = {
    personalDataRequest: false,
    demographicDataRequest: false,
    deleteRequest: false,

    //Mock data
    patient: {
      id: 1,
      name: "Franco",
      lastname: "Borrelli",
      documentType: "1",
      documentNumber: "39831178",
      age: "5 meses",
      visits: "53",
      birthday: moment("05/06/2013", "DD/MM/YYYY"),
      gender: "Másculino",
      address: "11 1419, La Plata, Buenos Aires",
      houseType: "1",
      waterType: "1",
      heatType: "1",
      electricity: 0,
      pets: 0,
      fridge: 0,
    }
  }

  componentDidMount = () => {}

  editPersonalDataHandler = data => {
    this.setState({personalDataRequest: true})
    //Request
    this.setState({personalDataRequest: false})
  }

  editDemographicDataHandler = data => {
    this.setState({demographicDataRequest: true})
    //Request
    this.setState({demographicDataRequest: false})
  }

  deletePatientHandler = () => {
    this.setState({deleteRequest: true})
    //Request
    this.setState({deleteRequest: false})
  }

  render() {
    return (
      <Section patient={this.state.patient}>
        <Switch>
          <Route
            path={this.props.match.url + '/edit'}
            render={() =>(
            <EditPatientPage
            patient={this.state.patient}
            personalDataSumitted={this.editPersonalDataHandler}
            demographicDataSumitted={this.editDemographicDataHandler}
            loadingPersonal={this.state.personalDataRequest}
            loadingDemographic={this.state.demographicDataRequest}
            />)}
            />
          <Route
            path={this.props.match.url + '/addRecord'}
            render={() =><AddRecordPage patient = {this.state.patient} />}
            />
          <Route
            path={this.props.match.url + '/:recordId(\d+)'}
            render={() =><RecordPage patient = {this.state.patient} />}
            />
          <Route
            path={this.props.match.url}
            render={() =><ProfilePage patient = {this.state.patient} />}
          />
        </Switch>
      </Section>
    )
  }
}

export default PatientPage
