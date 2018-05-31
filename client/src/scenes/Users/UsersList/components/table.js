import React from 'react';
import {Button, Icon, Card} from 'antd';
import Dropdown from './dropdown';
import {Link} from 'react-router-dom';
import Table from '../../../../components/table/table';

const tableUsers = props => {
  const data = props
    .data
    .map(user => ({
      key: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user
        .roles
        .map(role => role.name)
        .join(', '),
      status: user.active
        ? 'Activo'
        : 'Bloqueado'
    }));

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName.toUpperCase() < b.firstName.toUpperCase()
    }, {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => a.lastName.toUpperCase() < b.lastName.toUpperCase()
    }, {
      title: 'Nombre de Usuario',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.toUpperCase() < b.username.toUpperCase()
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.toUpperCase() < b.email.toUpperCase()
    }, {
      title: 'Roles',
      dataIndex: 'role',
      key: 'role'
    }, {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status'
    }
  ];

  if (props.user.permissions.includes('usuario_update')) {
    columns.push({
      title: 'Acciones',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 120,
      render: (text, record) => (<Dropdown record={record} user={props.user} onDelete={props.onDelete}/>)
    })
  }

  const extra = props.addPath
    ? (
      <Link to={props.addPath}>
        <Button onClick={props.onAdd}>
          <Icon type="user-add"/>Agregar
        </Button>
      </Link>
    )
    : null;

  return (
    <Card extra={extra}>
      <Table
        columns={columns}
        dataSource={data}
        loading={props.loading}
        scroll={{
        x: 1060
      }}/>
    </Card>
  );
};

export default tableUsers;
