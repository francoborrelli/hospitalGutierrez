import React, {Component} from "react"
import {Card, message, Row, Col} from "antd"

import Section from "../../../components/header/sectionHeader/sectionHeader"
import DemographicForm from "../components/demographicForm"
import PersonalForm from "../components/personalForm"

import withApiRefData from "../../../hoc/withApiRefData"

class editPatient extends Component {
  state = {
    personalData: [],
    demographicData: []
  }

  componentDidMount = () => {
    //request datos del paciente
  }

  personalDataSubmitHandler = data => {
    //request
    message.success("Se editaron los datos personales correctamente")
  }

  demographicDataSubmitHandler = data => {
    //request
    message.success("Se editaron los datos demograficos correctamente")
  }

  render() {
    return (
      <Section title="Editar datos">
        <Row>
          <Col lg={12}>
            <Card
              title="Datos Personales"
              style={{
              margin: "24px"
            }}>
              <PersonalForm
                vertical
                submitted={this.personalDataSubmitHandler}
                data={this.props.apiData}
                defaultValues={this.state.personalData}
                loading={this.state.loading}/>
            </Card>
          </Col>
          <Col lg={12}>

            <Card
              title="Datos Demográficos"
              style={{
              margin: "24px"
            }}>
              <DemographicForm
                vertical
                submitted={this.demographicDataSubmitHandler}
                data={this.props.apiData}
                defaultValues={this.state.demographicData}
                loading={this.state.loading}/>
            </Card>
          </Col>
        </Row>
      </Section>
    )
  }
}

export default withApiRefData()(editPatient)
