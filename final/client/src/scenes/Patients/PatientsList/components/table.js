import React from 'react';
import { Button, Icon, Card } from 'antd';
import { Link } from 'react-router-dom';
import Dropdown from './dropdown';
import Table from '../../../../components/table/table';

const tablePatients = props => {
  const data = props.data.map(patient => ({
    key: patient._id,
    firstName: patient.firstName,
    lastName: patient.lastName,
    documentType: patient.documentType,
    documentNumber: patient.documentNumber,
    controls: patient.clinicalRecords.length
  }));

  const documentTypes = [];

  Object.values(props.documentTypes).forEach(value => {
    documentTypes[value.id] = value.nombre;
  });

  const capitalize = str => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const compareByAlph = (a, b) => {
    if (a.toUpperCase() > b.toUpperCase()) {
      return -1;
    }
    if (a.toUpperCase() < b.toUpperCase()) {
      return 1;
    }
    return 0;
  };

  const columns = [
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
      defaultSortOrder: 'descend',
      sorter: (a, b) => compareByAlph(a.lastName, b.lastName),
      render: (text, record) => capitalize(text)
    },
    {
      title: 'Nombre',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => compareByAlph(a.firstName, b.firstName),
      render: (text, record) => capitalize(text)
    },
    {
      title: 'Tipo Doc.',
      dataIndex: 'documentType',
      render: (text, row, col) => <span>{documentTypes[text]}</span>
    },
    {
      title: 'Nº Doc.',
      dataIndex: 'documentNumber',
      key: 'documentNumber'
    },
    {
      title: 'Nº Controles',
      dataIndex: 'controls',
      key: 'controls'
    }
  ];

  const includes = permission => {
    return props.user.permissions.includes(permission);
  };

  if (
    includes('paciente_show') ||
    includes('paciente_update') ||
    includes('paciente_destroy')
  ) {
    columns.push({
      title: 'Acciones',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 110,
      render: (text, record) => (
        <Dropdown user={props.user} onDelete={props.onDelete} record={record} />
      )
    });
  }

  const extra =
    props.addPath && includes('paciente_new') ? (
      <Link to={props.addPath}>
        <Button onClick={props.onAdd}>
          <Icon type="user-add" />Agregar
        </Button>
      </Link>
    ) : null;

  return (
    <Card extra={extra}>
      <Table
        columns={columns}
        dataSource={data}
        loading={props.loading}
        scroll={{
          x: 600
        }}
      />
    </Card>
  );
};

export default tablePatients;
