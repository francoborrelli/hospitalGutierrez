import React, {Component} from "react"
import {Col, message} from "antd"
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
    documentTypes: [],
    data: []
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

    //Search Request

    this.setState({searching: true})
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
          <Col xl={7} style={{
            paddingBottom: 10
          }}>
            <SearchForm
              loading={this.state.searching}
              documentTypes={this.state.documentTypes}
              submitted={this.searchHandler}/>
          </Col>
          <Col xl={17}>
            <Table
              loading={this.state.loading}
              onDelete={this.deletePatientHandler}
              addPath="/patients/add"
              documentTypes={this.state.documentTypes}/>
          </Col>
        </Row>
      </Section>
    )
  }
}

export default hasPermission(PatientsList, ["paciente_index"])
