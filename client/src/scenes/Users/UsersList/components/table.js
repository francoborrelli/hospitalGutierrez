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

    const compareByAlph = (a, b) => {
      if (a.toUpperCase() > b.toUpperCase()) {
        return -1;
      }
      if (a.toUpperCase() < b.toUpperCase()) {
        return 1;
      }
      return 0;
    };

    const capitalize = (str) => {
      return str.replace(/\w\S*/g, function (txt) {
        return txt
          .charAt(0)
          .toUpperCase() + txt
          .substr(1)
          .toLowerCase();
      });
    }

  const columns = [
    {
      title: 'Nombre de Usuario',
      dataIndex: 'username',
      key: 'username',
      defaultSortOrder: "descend",
      sorter: (a, b) => compareByAlph(a.username, b.username)
    },
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => compareByAlph(a.lastName, b.lastName),
      render: text => capitalize(text)
    },
    {
      title: 'Nombre',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => compareByAlph(a.firstName, b.firstName),
      render: text => capitalize(text)
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => compareByAlph(a.email, b.email)
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
        x: 1070
      }}/>
    </Card>
  );
};

export default tableUsers;
