import React, {Component} from "react"
import {message} from "antd"
import {withRouter} from 'react-router-dom';

import Card from "../../../components/card/card"
import Section from "../../../components/header/sectionHeader/sectionHeader"
import Steps from "../../../components/steps/steps"
import DemographicForm from "../components/demographicForm"
import PersonalForm from "../components/personalForm"

import withApiRefData from "../../../hoc/withApiRefData"
import hasPermission from '../../../hoc/hasPermission';

import axios from '../../../axios-api';

class AddPatient extends Component {
  state = {
    loading: false,
    current: 0,
    personalData: [],
    demographicData: []
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

  redirect = () => {
    this
      .props
      .history
      .push("/patients")
  }

  personalDataSubmitHandler = data => {
    this.setState({personalData: data})
    this.nextStep()
  }

  demographicDataSubmitHandler = data => {
    const result = {
      ...data,
      ...this.state.personalData
    }
    this.addHandler(result)
  }

  addHandler = data => {
    this.setState({loading: true})
    const result = {
      ...data,
      hasPet: data.hasPet === 1,
      hasRefrigerator: data.hasRefrigerator === 1,
      hasElectricity: data.hasElectricity === 1
    }
    axios
      .post('patients', result)
      .then(() => {
        this.setState({loading: false})
        this.redirect()
        message.success("Se agregó a " + data.firstName + " " + data.lastName + " correctamente.")
      })
      .catch(() => {
        this.setState({loading: false})
        message.error("Ocurrió un error. Intanta nuevamente")
      })
  }

  render() {
    const steps = [
      {
        title: "Datos Personales",
        content: (<PersonalForm
          onCancel={this.redirect}
          submitted={this.personalDataSubmitHandler}
          data={this.props.apiData}
          patient={this.state.personalData}
          loading={false}
          btnText="Continuar"/>)
      }, {
        title: "Datos Demográficos",
        content: (<DemographicForm
          submitted={this.demographicDataSubmitHandler}
          data={this.props.apiData}
          patient={this.state.demographicData}
          prevStep={this.prevStepHandler}
          loading={this.state.loading}/>)
      }
    ]

    return (
      <Section title="Agregar Paciente" goBackTo="/patients">
        <div style={{
          margin: "0 10px"
        }}>
          <Card
            style={{
            maxWidth: 850,
            margin: "10px auto"
          }}>
            <div className="container" style={{
              maxWidth: 700
            }}>
              <Steps current={this.state.current} steps={steps}/>
            </div>
          </Card>
        </div>
      </Section>
    )
  }
}

export default withRouter(hasPermission(withApiRefData()(AddPatient), ['paciente_new']))
