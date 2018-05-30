import React, {Component} from "react"
import {message} from 'antd';
import {Route, Switch, withRouter} from "react-router-dom"

import Section from "./components/patientHeader"
import ProfilePage from "./Profile/Profile"
import AddRecordPage from "./ClinicHistory/AddRecord/AddRecord"
import EditPatientPage from "../Patients/EditPatient/EditPatient"
import RecordPage from "./ClinicHistory/Record"

import hasPermission from '../../hoc/hasPermission';
import Error403 from '../Errors/403';

import axios from "../../axios-api.js"

class PatientPage extends Component {
  state = {
    personalDataRequest: false,
    demographicDataRequest: false,
    loadingPage: true,
    deleteRequest: false,

    patient: {}
  }

  componentDidMount = () => {
    axios
      .get('patients/' + this.props.match.params.patientId)
      .then(response => {
        this.setState({patient: response.data, loadingPage: false})
      })
  }

  editPersonalDataHandler = data => {
    this.setState({personalDataRequest: true})
    //Request
    this.setState({personalDataRequest: false})
    message.success("Los datos del paciente se actualizaron correctamente.")
  }

  editDemographicDataHandler = data => {
    this.setState({demographicDataRequest: true})
    //Request
    this.setState({demographicDataRequest: false})
    message.success("Los datos demográficos del paciente se actualizaron correctamente.")
  }

  deletePatientHandler = patient => {
    this.setState({deleteRequest: true})
    return new Promise((resolve, reject) => {
      //Change Timeout for delete request
      setTimeout(Math.random() > 0.3
        ? resolve
        : reject, 1000)
    }).then(() => {
      const name = patient.name + " " + patient.lastname
      message.success("Se eliminó a " + name + " correctamente.")
      this.setState({loading: false})
      this
        .props
        .history
        .push("/patients")
    }).catch(() => message.error("Algo falló. Intentá nuevamente."))
  }

  deleteRecordHandler = record => {
    this.setState({deleteRequest: true})

    this.setState({deleteRequest: false})
  }

  checkPermissions = () => {
    const url = this.props.location.pathname
    switch (true) {
      case url === (this.props.match.url + '/edit'):
        return this
          .props
          .user
          .permissions
          .includes('paciente_update') || this
          .props
          .user
          .permissions
          .includes('datosDemograficos_update')
        case url === (this.props.match.url + '/addRecord'):
        return this
          .props
          .user
          .permissions
          .includes('control_new')
        case url
          .includes(this.props.match.url + '/record'):
        return this
          .props
          .user
          .permissions
          .includes('control_show')
        default:
        return true
    }
  }

  render() {

    const section = <Section patient={this.state.patient}>
      <Switch>
        <Route
          path={this.props.match.url + '/edit'}
          exact
          render={() => (<EditPatientPage
          patient={this.state.patient}
          user={this.props.user}
          personalDataSumitted={this.editPersonalDataHandler}
          demographicDataSumitted={this.editDemographicDataHandler}
          loadingPage={this.state.loadingPage}
          loadingPersonal={this.state.personalDataRequest}
          loadingDemographic={this.state.demographicDataRequest}/>)}/>
        <Route
          path={this.props.match.url + '/addRecord'}
          exact
          render={() => (<AddRecordPage
          user={this.props.user}
          loading={this.state.deleteRequest}/>)}/>
        <Route
          path={this.props.match.url + '/record/:recordId'}
          render={() => (<RecordPage
          user={this.props.user}
          onDeleteRecord={this.deleteRecordHandler}
          patient={this.state.patient}/>)}/>
        <Route
          path={this.props.match.url}
          exact
          render={() => (<ProfilePage
          patient={this.state.patient}
          user={this.props.user}
          loadingPage={this.state.loadingPage}
          onDeleteRecord={this.deleteRecordHandler}
          onDeletePatient={this.deletePatientHandler}/>)}/>
      </Switch>
    </Section>

    return this.checkPermissions()
      ? section
      : <Error403/>
  }
}

export default withRouter(hasPermission(PatientPage, ['paciente_show']))
