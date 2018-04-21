import React, { Component } from "react"
import { Card, Row, Col, message } from "antd"

import Section from "../../../components/header/sectionHeader/sectionHeader"
import SearchForm from "./components/searchForm"
import Table from "./components/table"

import axios from "../../../axios-apiReferences"

class PatientsList extends Component {
  state = {
    loading: true,
    searching: false,
    documentTypes: [],
    data: []
  }

  componentDidMount = () => {
    axios
      .get(
        "tipo-documento"
      )
      .then(response => {
        this.setState({
          loading: false,
          documentTypes: response.data
        })
      })
  }

  searchHandler = (data) => {
    this.setState({...this.state, searching: true})
  }

  deletePatientHandler = (patient) => {
    this.setState({loading: true})
    const name = patient.name + ' ' + patient.lastname
    message.success("Se eliminó a " + name + " correctamente.")
    this.setState({loading: false})
  }


  render() {
    return (
      <Section title="pacientes">
        <Row>
          <Col xl={7}>
            <Card style={{ margin: "24px" }} title="Busqueda">
              <SearchForm
                loading={this.state.searching}
                documentTypes={this.state.documentTypes}
                submitted={this.searchHandler}
              />
            </Card>
          </Col>
          <Col xl={17}>
            <Card style={{ margin: "24px" }}>
              <Table loading={this.state.loading} onDelete={this.deletePatientHandler} addPath="/patients/add" documentTypes={this.state.documentTypes} />
            </Card>
          </Col>
        </Row>
      </Section>
    )
  }
}

export default PatientsList
