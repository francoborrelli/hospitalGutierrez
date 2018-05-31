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

import axiosApi from "../../axios-api.js"
import axiosRef from "../../axios-apiReferences"

class PatientPage extends Component {
  state = {
    personalDataRequest: false,
    demographicDataRequest: false,
    loadingPage: true,
    deleteRequest: false,

    patient: {}
  }

  componentDidMount = () => {
    axiosApi
      .get('patients/' + this.props.match.params.patientId)
      .then(response => {

        const requests = [
          axiosRef.get('/tipo-documento/' + response.data.documentType),
          axiosRef.get('/tipo-vivienda/' + response.data.houseType),
          axiosRef.get('/tipo-agua/' + response.data.waterType),
          axiosRef.get('/tipo-calefaccion/' + response.data.heatingType)
        ]

        if (response.data.insurance) {
          requests.push(axiosRef.get('/obra-social/' + response.data.insurance))
        }

        Promise
          .all(requests)
          .then((results) => {
            this.setState({
              loadingPage: false,
              patient: {
                ...response.data,
                documentType: results[0].data.nombre,
                houseType: results[1].data.nombre,
                waterType: results[2].data.nombre,
                heatingType: results[3].data.nombre,
                insurance: results[4]
                  ? results[4].data.nombre
                  : null
              }
            })
          })
          .catch()
      })
  }

  editPersonalDataHandler = data => {
    this.setState({personalDataRequest: true})
    axiosApi
      .patch('patients/' + this.props.match.params.patientId, data)
      .then(response => {
        this.setState({patient: response.data, personalDataRequest: false})
        message.success("Los datos del paciente se actualizaron correctamente.")
      })
      .catch(() => {
        this.setState({personalDataRequest: false})
        message.error("Ha ocurrido un error. Intenta nuevamente.")
      })
  }

  editDemographicDataHandler = data => {
    const result = {
      ...data,
      hasPet: data.hasPet === 1,
      hasRefrigerator: data.hasRefrigerator === 1,
      hasElectricity: data.hasElectricity === 1
    }
    this.setState({demographicDataRequest: true})
    axiosApi
      .patch('patients/' + this.props.match.params.patientId + '/demographicData', result)
      .then(response => {
        this.setState({patient: response.data, demographicDataRequest: false})
        message.success("Los datos demográficos del paciente se actualizaron correctamente.")
      })
      .catch(() => {
        this.setState({demographicDataRequest: false})
        message.error("Ha ocurrido un error. Intenta nuevamente.")
      })
  }

  deletePatientHandler = patient => {
    this.setState({deleteRequest: true})
    return axiosApi
      .patch('patients/' + this.props.match.params.patientId, {deleted: true})
      .then(() => {
        const name = patient.firstName + " " + patient.lastName
        message.success("Se eliminó a " + name + " correctamente.")
        this.setState({loading: false})
        this
          .props
          .history
          .push("/patients")
      })
      .catch(() => message.error("Algo falló. Intentá nuevamente."))
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
          render={() => (<AddRecordPage user={this.props.user} loading={this.state.deleteRequest}/>)}/>
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
