import React from "react"
import {Button, Icon} from "antd"
import {Link} from "react-router-dom"
import Table from '../../../../../components/table/table';
import Dropdown from "./dropdown"

const data = [
  {
    key: "1",
    date: "11/45/2016",
    user: "francoborrelli",
    weight: "10",
    height: "102",
    pc: "23",
    ppc: "32"
  }
]

const tableUsers = props => {
  const columns = [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date > b.date
    }, {
      title: "Usuario",
      dataIndex: "user",
      key: "user",
      sorter: (a, b) => a.user < b.user
    }, {
      title: "Peso",
      dataIndex: "weight",
      key: "weight",
      sorter: (a, b) => a.weight < b.weight,
      render: (text, record) => (text + " kg")
    }, {
      title: "Talla",
      dataIndex: "height",
      key: "height",
      sorter: (a, b) => a.height < b.height,
      render: (text, record) => (text + " cm")
    }, {
      title: "PC",
      dataIndex: "pc",
      key: "pc",
      sorter: (a, b) => a.pc < b.pc,
      render: (text, record) => (text + " cm")
    }, {
      title: "PPC",
      dataIndex: "ppc",
      key: "ppc",
      sorter: (a, b) => a.ppc < b.ppc,
      render: (text, record) => (text + " cm")
    }, {
      title: "Acciones",
      key: "action",
      align: "center",
      fixed: "right",
      width: 120,
      render: (text, record) => (<Dropdown onDelete={() => {}} record={record}/>)
    }
  ]

  return (
      <Table
        columns={columns}
        dataSource={data}
        loading={props.loading}
        scroll={{x: 950}}/>
  )
}

export default tableUsers
