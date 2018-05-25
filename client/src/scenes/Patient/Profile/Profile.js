import React from "react"

import {Col} from 'antd';
import Row from '../../../components/grid/row';

import PatientCard from './components/personalData/personalData'
import Reports from './components/reports/reports';
import ClinicHistory from '../ClinicHistory/RecordsList/RecordsList';

const profile = props => (
  <Row>
    <Col xl={9} xxl={7} style={{
      paddingBottom: 10
    }}>
      <PatientCard patient={props.patient} onDeletePatient={props.onDeletePatient}/>
    </Col>
    <Col xl={15} xxl={17} style={{
      paddingBottom: 10
    }}>
      <ClinicHistory patient={props.patient} onDeleteRecord={props.onDeleteRecord}/>
    </Col>
    <Col xl={15} xxl={17}>
      <Reports patient={props.patient}/>
    </Col>
  </Row>
)

export default profile
