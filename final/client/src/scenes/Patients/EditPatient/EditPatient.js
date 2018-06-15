import React from 'react';
import { Card, Col } from 'antd';
import { withRouter } from 'react-router-dom';

import Row from '../../../components/grid/row';
import DemographicForm from '../components/demographicForm';
import PersonalForm from '../components/personalForm';

import withApiRefData from '../../../hoc/withApiRefData';

const editPatient = props => {
  
  const PdPermission = props.user.permissions.includes('paciente_update');
  const DmPermission = props.user.permissions.includes('datosDemograficos_update');

  const editPersonal = PdPermission ? (
    <Col lg={12} style={{ marginBottom: 10 }}>
      <Card title="Datos Personales" loading={props.loadingPage}>
        <PersonalForm
          reset
          data={props.apiData}
          submitted={props.personalDataSumitted}
          patient={props.patient}
          loading={props.loadingPersonal}
        />
      </Card>
    </Col>
  ) : null;

  const editDemographic = DmPermission ? (
    <Col lg={12}>
      <Card title="Datos Demográficos" loading={props.loadingPage}>
        <DemographicForm
          reset
          data={props.apiData}
          patient={props.patient}
          loading={props.loadingDemographic}
          submitted={props.demographicDataSumitted}
        />
      </Card>
    </Col>
  ) : null;

  return (
    <Row justify={!DmPermission || !PdPermission}>
      {editPersonal}
      {editDemographic}
    </Row>
  );
};

export default withRouter(withApiRefData()(editPatient));
