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
        <Col xl={15} xxl={17} style={{paddingBottom: 10}}>
          <ClinicHistory user={props.user} loading={props.loadingPage} patient={props.patient} onDeleteRecord={props.onDeleteRecord}/>
        </Col>
        <Col xl={15} xxl={17}>
          <Reports patient={props.patient} loading={props.loadingPage}/>
        </Col>
      </Fragment>
    : null

  return (
    <Row justify={!HcPermission}>
      <Col xl={9} xxl={7} style={{paddingBottom: 10}}>
        <PatientCard
          loading={props.loadingPage}
          user={props.user}
          patient={props.patient}
          onDeletePatient={props.onDeletePatient}/>
      </Col>
      {clinicHistory}
    </Row>
  )
}

export default profile
