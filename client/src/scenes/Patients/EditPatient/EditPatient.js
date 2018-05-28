import React from "react"
import {Card, Col} from "antd"
import {withRouter} from 'react-router-dom';

import Row from '../../../components/grid/row';
import DemographicForm from "../components/demographicForm"
import PersonalForm from "../components/personalForm"

import withApiRefData from "../../../hoc/withApiRefData"
import hasPermission from '../../../hoc/hasPermission';

const editPatient = props => (
  <Row>
    <Col lg={12} style={{
      marginBottom: 10
    }}>
      <Card title="Datos Personales">
        <PersonalForm
          reset
          data={props.apiData}
          submitted={props.personalDataSumitted}
          patient={props.patient}
          loading={props.loadingPersonal}/>
      </Card>
    </Col>
    <Col lg={12}>
      <Card title="Datos Demográficos">
        <DemographicForm
          reset
          data={props.apiData}
          patient={props.patient}
          loading={props.loadingDemographic}
          submitted={props.demographicDataSumitted}/>
      </Card>
    </Col>
  </Row>
)

export default withRouter(hasPermission(withApiRefData()(editPatient), ['paciente_update']))
