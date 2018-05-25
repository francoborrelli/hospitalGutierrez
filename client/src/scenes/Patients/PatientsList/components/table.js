import React from "react"
import {Button, Icon, Card} from "antd"
import {Link} from "react-router-dom"
import Dropdown from "./dropdown"
import Table from '../../../../components/table/table';

const data = [
  {
    key: "1",
    name: "Franco",
    lastname: "Borrelli",
    documentType: "1",
    documentNumber: 32
  }, {
    key: "2",
    name: "Pedro",
    lastname: "Brost",
    documentType: "2",
    documentNumber: 3223423432
  }, {
    key: "3",
    name: "Juan",
    lastname: "Perez",
    documentType: "1",
    documentNumber: 397872
  }, {
    key: "4",
    name: "John",
    lastname: "Garcia",
    documentType: "3",
    documentNumber: 41243
  }
]

const tablePatients = props => {

  const documentTypes = []
  Object
    .values(props.documentTypes)
    .forEach(value => {
      documentTypes[value.id] = value.nombre
    })

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
      title: "Tipo Doc.",
      dataIndex: "documentType",
      render: (text, row, col) => <span>{documentTypes[text]}</span>
    }, {
      title: "Nº Doc.",
      dataIndex: "documentNumber",
      key: "documentNumber"
    }, {
      title: "Acciones",
      key: "action",
      align: "center",
      fixed: "right",
      width: 110,
      render: (text, record) => (<Dropdown onDelete={props.onDelete} record={record}/>)
    }
  ]


  const extra = <Link to={props.addPath}>
    <Button onClick={props.onAdd}>
      <Icon type="user-add"/>Agregar
    </Button>
  </Link>

  return (
    <Card extra={extra}>
      <Table
        columns={columns}
        dataSource={data}
        loading={props.loading}
        scroll={{x: 600}}/>
    </Card>
  )
}

export default tablePatients
