import React, { Component } from "react"
import { Row, Col} from "antd"

import Section from "../../components/header/sectionHeader/sectionHeader"
import PageConfiguration from "./components/pageConfiguration"
import MantainmentConfiguration from "./components/mantainmentConfiguration"
import ElementsConfiguration from "./components/elementsConfiguration"

class Configuration extends Component {
  state = {}

  componentDidMount = () => {
    //Get table data
  }

  render() {
    return (
      <Section title="Configuración">
        <Row>
          <Col xs={24} xl={14}>
            <PageConfiguration/>
          </Col>
          <Col xs={24} xl={10}>
            <Row>
              <Col md={12} xl={24} xxl={12}>
                <ElementsConfiguration/>
              </Col>
              <Col md={12} xl={24} xxl={12}>
                <MantainmentConfiguration/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Section>
    )
  }
}

export default Configuration
