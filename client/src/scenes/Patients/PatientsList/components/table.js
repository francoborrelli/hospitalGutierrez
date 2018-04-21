import React from "react"
import { Table, Button, Icon, Divider, Modal } from "antd"
import {Link} from "react-router-dom"

const data = [
  {
    key: "1",
    name: "Franco",
    lastname: "Borrelli",
    documentType: "1",
    documentNumber: 32
  },
  {
    key: "2",
    name: "Pedro",
    lastname: "Brost",
    documentType: "2",
    documentNumber: 3223423432
  },
  {
    key: "3",
    name: "Juan",
    lastname: "Perez",
    documentType: "1",
    documentNumber: 397872
  },
  {
    key: "4",
    name: "John",
    lastname: "Garcia",
    documentType: "3",
    documentNumber: 41243
  }
]

const tablePatients = props => {

  const showConfirm = record =>
    Modal.confirm({
      title: "¿Estás Seguro?",
      okText: "Confirmar",
      cancelText: "Cancelar",
      content:
        "Estas a punto de eliminar al paciente " +
        record.name +
        " " +
        record.lastname +
        ".",
      maskClosable: true,
      onOk: () => props.onDelete(record)
    })

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name - b.name
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
      sorter: (a, b) => a.lastname - b.lastname
    },
    {
      title: "Tipo Doc.",
      dataIndex: "documentType",
      key: "documentType",
      sorter: (a, b) => a.documentType - b.documentType
    },
    {
      title: "Nº Doc.",
      dataIndex: "documentNumber",
      key: "documentNumber"
    },
    {
      title: "Acciones",
      key: "action",
      align: "center",
      render: (text, record) => (
        <span>
          <a href="">Ver</a>
          <Divider type="vertical" />
          <a onClick={() => showConfirm(record)}>Eliminar</a>
        </span>
      )
    }
  ]
  return (
    <div>
      <div className="table-operations">
      <Link to={props.addPath}>
        <Button onClick={props.onAdd} type="primary" style={{ marginBottom: 15 }}>
          <Icon type="user-add" />Agregar
        </Button>
      </Link>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={props.loading}
        locale={{ emptyText: "No hay datos" }}
        scroll={{ x: 600 }}
      />
    </div>
  )
}

export default tablePatients
