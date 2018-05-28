import React, {Fragment} from "react"

import {Col} from 'antd';
import Row from '../../../components/grid/row';

import PatientCard from './components/personalData/personalData'
import Reports from './components/reports/reports';
import ClinicHistory from '../ClinicHistory/RecordsList/RecordsList';

const profile = props => {

  const HcPermission = props
    .user
    .permissions
    .includes('historiaClinica_index')

  const clinicHistory = HcPermission
    ? <Fragment>
        <Col xl={15} xxl={17} style={{
          paddingBottom: 10
        }}>
          <ClinicHistory patient={props.patient} onDeleteRecord={props.onDeleteRecord}/>
        </Col>
        <Col xl={15} xxl={17}>
          <Reports patient={props.patient}/>
        </Col>
      </Fragment>
    : null

  return (
    <Row justify={!HcPermission}>
      <Col xl={9} xxl={7} style={{paddingBottom: 10}}>
        <PatientCard
          user={props.user}
          patient={props.patient}
          onDeletePatient={props.onDeletePatient}/>
      </Col>
      {clinicHistory}
    </Row>
  )
}

export default profile
