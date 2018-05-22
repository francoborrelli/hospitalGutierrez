import React from "react"

import { Col} from 'antd';
import Row from '../../../components/grid/row';

import Section from '../components/patientHeader';
import PatientCard from './components/personalData/personalData'
import Reports from './components/reports/reports';
import ClinicHistory from '../ClinicHistory/RecordsList/RecordsList';


const profile = props =>  (
  <Section patient={props.patient}>
      <Row>
          <Col xl={9} xxl={7} style={{paddingBottom: 10}}>
            <PatientCard patient={props.patient}/>
          </Col>
          <Col xl={15} xxl={17} style={{paddingBottom: 10}}>
            <ClinicHistory patient={props.patient}/>
          </Col>
          <Col xl={15} xxl={17}>
            <Reports patient={props.patient}/>
          </Col>
        </Row>
  </Section>
  )

export default profile
