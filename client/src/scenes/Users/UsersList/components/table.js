import React from 'react';
import { Button, Icon, Card } from 'antd';
import Dropdown from './dropdown';
import { Link } from 'react-router-dom';
import Table from '../../../../components/table/table';

const tableUsers = props => {
  const data = props.data.map(user => ({
    key: user._id,
    name: user.firstName,
    lastname: user.lastName,
    username: user.username,
    email: user.email,
    role: user.roles.map(role => role.name).join(', '),
    status: user.active ? 'Activo' : 'Bloqueado'
  }));

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name < b.name
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
      sorter: (a, b) => a.lastname < b.lastname
    },
    {
      title: 'Nombre de Usuario',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username < b.username
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email < b.email
    },
    {
      title: 'Roles',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Acciones',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 120,
      render: (text, record) => (<Dropdown
        record={record}
        permissions={props.permissions}
        onDelete={props.onDelete}/>)
    }
  ];

  const extra = props.addPath ? (
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
          x: 950
        }}
      />
    </Card>
  );
};

export default tableUsers;
