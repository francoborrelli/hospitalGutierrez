import React, {Component} from "react"
import {Col, message} from "antd"
import {withRouter} from "react-router-dom"
import Row from "../../../components/grid/row";
import Section from "../../../components/header/sectionHeader/sectionHeader"
import SearchForm from "./components/searchForm"
import Table from "./components/table"
import hasPermission from "../../../hoc/hasPermission"
import axios from "../../../axios-apiReferences"

class PatientsList extends Component {
  state = {
    loading: true,
    searching: false,
    filtered: false,
    documentTypes: [],
    patients: [
      {
        _id: "1",
        firstName: "Franco",
        lastName: "Borrelli",
        documentType: "1",
        documentNumber: 32
      }, {
        _id: "2",
        firstName: "Pedro",
        lastName: "Brost",
        documentType: "2",
        documentNumber: 3223423432
      }
    ],
    allPatients: [
      {
        _id: "1",
        firstName: "Franco",
        lastName: "Borrelli",
        documentType: "1",
        documentNumber: "32"
      }, {
        _id: "2",
        firstName: "Pedro",
        lastName: "Brost",
        documentType: "2",
        documentNumber: "3223423432"
      }
    ]
  }

  componentDidMount = () => {
    axios
      .get("tipo-documento")
      .then(response => {
        this.setState({loading: false, documentTypes: response.data})
      })
  }

  searchHandler = data => {
    this.setState({searching: true})
    let patients = this.state.allPatients

    if (data.name) {
      patients = patients.filter(patient => patient.firstName.toLowerCase().includes(data.name.toLowerCase()));
    }
    if (data.lastname) {
      patients = patients.filter(patient => patient.lastName.toLowerCase().includes(data.lastname.toLowerCase()));
    }
    if (data.documentNumber) {
      patients = patients.filter(patient => patient.documentNumber.toLowerCase().includes(data.documentNumber.toLowerCase()));
    }
    if (data.documentType) {
      patients = patients.filter(patient => patient.documentType === data.documentType);
    }

    let filtered = this.state.allPatients.length !== patients.length
    this.setState({searching: false, patients: patients, filtered: filtered})
  }

  resetHandler = () => {
    this.setState(prevState => ({patients: prevState.allPatients, filtered: false}))
  }

  deletePatientHandler = patient => {
    return new Promise((resolve, reject) => {
      //Change Timeout for delelte request
      setTimeout(Math.random() > 0.3
        ? resolve
        : reject, 1000)
    }).then(() => {
      this.setState({loading: true})
      const name = patient.name + " " + patient.lastname
      message.success("Se eliminó a " + name + " correctamente.")
      this.setState({loading: false})
    }).catch(() => message.error("Algo falló. Intentá nuevamente."))
  }

  render() {
    return (
      <Section title="pacientes">
        <Row>
          <Col xl={6} style={{
            paddingBottom: 10
          }}>
            <SearchForm
              mantainDefault
              goBlank={this.state.filtered
              ? this.resetHandler
              : null}
              loading={this.state.searching}
              documentTypes={this.state.documentTypes}
              submitted={this.searchHandler}/>
          </Col>
          <Col xl={18}>
            <Table
              loading={this.state.loading}
              data={this.state.patients}
              user={this.props.user}
              onDelete={this.deletePatientHandler}
              documentTypes={this.state.documentTypes}
              addPath={'/patients/add'}/>
          </Col>
        </Row>
      </Section>
    )
  }
}

export default withRouter(hasPermission(PatientsList, ["paciente_index"]))
