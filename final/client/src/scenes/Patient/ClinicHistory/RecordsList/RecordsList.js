import React from 'react';
import { Card, Icon, Button } from 'antd';
import Table from './components/table';
import { Link } from 'react-router-dom';

const clinicHistoryList = props => {
  const extra = props.user.permissions.includes('control_new') ? (
    <Link to={props.patient._id + '/addRecord'}>
      <Button size="small">
        <Icon type="user-add" />
        Agregar
      </Button>
    </Link>
  ) : null;

  return (
    <Card title="Historia Clínica" extra={extra} loading={props.loading}>
      <Table
        user={props.user}
        patient={props.patient}
        onDeleteRecord={props.onDeleteRecord}
      />
    </Card>
  );
};

export default clinicHistoryList;
