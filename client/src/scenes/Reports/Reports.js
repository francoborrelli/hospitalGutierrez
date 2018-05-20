import React, {Component} from "react";

import { Card, Row, Col, message } from "antd";
import Section from "../../components/header/sectionHeader/sectionHeader"
import Report from "./components/report"
class Reports extends Component {
  state = {
    enterLoading: false
  }


  render(){
    return(
    <Section title="Reportes">
      <Row gutter={16} style={{padding: 10}}>
        <Col xl={8}>
          <Report></Report>
        </Col>
        <Col xl={8}>
          <Report></Report>
        </Col>
        <Col xl={8}>
          <Report></Report>
        </Col>
      </Row>

    </Section>)
  }

}

export default Reports;
