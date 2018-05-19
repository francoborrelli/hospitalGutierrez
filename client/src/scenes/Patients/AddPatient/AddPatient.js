import React, { Component } from "react"
import { message } from "antd"

import Card from "../../../components/card/card"
import Section from "../../../components/header/sectionHeader/sectionHeader"
import Steps from "../../../components/steps/steps"
import DemographicForm from "../components/demographicForm"
import PersonalForm from "../components/personalForm"

import withApiRefData from "../../../hoc/withApiRefData"

class AddPatient extends Component {
  state = {
    loading: false,
    current: 0,
    personalData: [],
    demographicData: [],
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
            data={this.props.apiData}
            defaultValues={this.state.personalData}
            btnText="Continuar"
          />
        )
      },
      {
        title: "Datos Demográficos",
        content: (
          <DemographicForm
            submitted={this.demographicDataSubmitHandler}
            data={this.props.apiData}
            defaultValues={this.state.demographicData}
            prevStep={this.prevStepHandler}
            loading={this.state.loading}
          />
        )
      }
    ]

    return (
      <Section title="Agregar Paciente">
        <Card>
          <div className="container" style={{ maxWidth: 700 }}>
            <Steps current={this.state.current} steps={steps} />
          </div>
        </Card>
      </Section>
    )
  }
}

export default withApiRefData()(AddPatient)