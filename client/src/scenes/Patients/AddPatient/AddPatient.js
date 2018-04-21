import React, { Component } from "react"
import { Card, message } from "antd"

import Section from "../../../components/header/sectionHeader/sectionHeader"
import Steps from "../../../components/steps/steps"

import DemographicForm from "./components/demographicForm"
import PersonalForm from "./components/personalForm"

import axios from "axios"
import { path } from "../../../axios-apiReferences"

class AddPatient extends Component {
  state = {
    loading: false,
    current: 0,
    personalData: [],
    demographicData: [],
    apiData: {
      documentTypes: [],
      insurances: [],
      houseTypes: [],
      waterTypes: [],
      heatingTypes: []
    }
  }

  componentDidMount = () => {
    axios
      .all([
        axios.get(path + "tipo-documento"),
        axios.get(path + "obra-social"),
        axios.get(path + "tipo-vivienda"),
        axios.get(path + "tipo-agua"),
        axios.get(path + "tipo-calefaccion")
      ])
      .then(
        axios.spread(
          (documentTypes, insurance, houseTypes, waterTypes, heatingTypes) => {
            this.setState({
              apiData: {
                documentTypes: documentTypes.data,
                insurances: insurance.data,
                houseTypes: houseTypes.data,
                waterTypes: waterTypes.data,
                heatingTypes: heatingTypes.data
              }
            })
          }
        )
      )
  }

  nextStep = () => {
    this.setState((prevState, props) => ({
      current: prevState.current + 1
    }))
  }

  prevStepHandler = data => {
    this.setState((prevState, props) => ({
      current: prevState.current - 1,
      demographicData: data
    }))
  }

  personalDataSubmitHandler = data => {
    this.setState({ personalData: data })
    this.nextStep()
  }

  demographicDataSubmitHandler = data => {
    const result = { ...data, ...this.state.personalData }
    this.addHandler(result)
  }

  addHandler = data => {
    this.setState({ loading: true })

    //request

    this.setState({ loading: false })
    this.props.history.push("/patients")
    message.success(
      "Se agregó a " + data.name + " " + data.lastname + " correctamente."
    )
  }
  render() {
    const steps = [
      {
        title: "Datos Personales",
        content: (
          <PersonalForm
            submitted={this.personalDataSubmitHandler}
            values={this.state.personalData}
            data={this.state.apiData}
          />
        )
      },
      {
        title: "Datos Demográficos",
        content: (
          <DemographicForm
            data={this.state.apiData}
            submitted={this.demographicDataSubmitHandler}
            prevStep={this.prevStepHandler}
            loading={this.state.loading}
          />
        )
      }
    ]

    return (
      <Section title="Agregar Paciente">
        <Card style={{ margin: "24px" }}>
          <div className="container" style={{ maxWidth: 700 }}>
            <Steps current={this.state.current} steps={steps} />
          </div>
        </Card>
      </Section>
    )
  }
}

export default AddPatient
