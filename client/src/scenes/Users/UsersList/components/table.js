import React from "react"
import {Button, Icon, Card} from "antd"
import Dropdown from "./dropdown"
import {Link} from "react-router-dom"
import Table from '../../../../components/table/table';

const data = [
  {
    key: "1",
    name: "Franco",
    lastname: "Borrelli",
    username: "fborrelli",
    email: "FrancoBorrelli@gmai.com",
    role: "Administrador",
    status: "Activo"
  }, {
    key: "2",
    name: "Pedro",
    lastname: "Brost",
    username: "2",
    email: "pedrobrost@gmail.com",
    role: "",
    status: "Activo"
  }, {
    key: "3",
    name: "Juan",
    lastname: "Perez",
    documentType: "1",
    email: 397872,
    role: "",
    status: "Bloqueado"
  }, {
    key: "4",
    name: "John",
    lastname: "Garcia",
    username: "3",
    email: 41243,
    role: "",
    status: "Activo"
  }
]

const tableUsers = props => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name < b.name
    }, {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
      sorter: (a, b) => a.lastname < b.lastname
    }, {
      title: "Nombre de Usuario",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username < b.username
    }, {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email < b.email
    }, {
      title: "Roles",
      dataIndex: "role",
      key: "role"
    }, {
      title: "Estado",
      dataIndex: "status",
      key: "status"
    }, {
      title: "Acciones",
      key: "action",
      align: "center",
      fixed: "right",
      width: 120,
      render: (text, record) => (<Dropdown record={record} onDelete={props.onDelete}/>)
    }
  ]

  const extra = props.addPath
    ? <Link to={props.addPath}>
        <Button onClick={props.onAdd}>
          <Icon type="user-add"/>Agregar
        </Button>
      </Link>
    : null

  return (
    <Card extra={extra}>
      <Table
        columns={columns}
        dataSource={data}
        loading={props.loading}
        scroll={{
        x: 950
      }}/>
    </Card>
  )
}

export default tableUsers
