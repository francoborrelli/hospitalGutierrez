import React, { Component } from "react"
import { Row, Col} from "antd"

import Section from "../../components/header/sectionHeader/sectionHeader"
import PageConfiguration from "./components/pageConfiguration"
import MantainmentConfiguration from "./components/mantainmentConfiguration"
import ElementsConfiguration from "./components/elementsConfiguration"

class Configuration extends Component {
  state = {
    pageInfoRequest: false,
    elementsRequest: false,
    mantaintmentRequest: false,

    //MOCK DATA
    pageInfo:
      {
        title: "Hospital Gutierrez",
        email: "hospital@gmail.com",
        description: "Esto es un hospital"
    },
    elementsNumber: 4,
    mantainment: false
  }

  componentDidMount = () => {
    //Get data
  }

  updatePageInfoHandler = data => {
    this.setState({pageInfoRequest: true})
    //resquest
    this.setState({pageInfoRequest: false})
  }

  updateElementsNumberHandler = data => {
    this.setState({elementsRequest: true})
    //resquest
    this.setState({elementsRequest: false})
  }

  mantaintmentHandler = boolean => {
    this.setState({mantaintmentRequest: true})
    //resquest
    this.setState({mantaintmentRequest: false})
  }

  render() {
    return (
      <Section title="Configuración">
        <Row gutter={16} style={{padding: 25}}>
          <Col xs={24} xl={14} style={{marginBottom: 20}}>
            <PageConfiguration
            values={this.state.pageInfo}
            loading={this.state.pageInfoRequest}
            submitted={this.updatePageInfoHandler}
            />
          </Col>
          <Col xs={24} xl={10}>
            <Row gutter={16}>
              <Col md={12} xl={24} xxl={12} style={{marginBottom: 20}}>
                <ElementsConfiguration
                value={this.state.elementsNumber}
                submitted={this.updateElementsNumberHandler}
                loading={this.state.elementsRequest}
                />
              </Col>
              <Col md={12} xl={24} xxl={12}>
                <MantainmentConfiguration
                value={this.state.mantainment}
                loading={this.state.mantaintmentRequest}
                clicked={this.mantaintmentHandler}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Section>
    )
  }
}

export default Configuration
