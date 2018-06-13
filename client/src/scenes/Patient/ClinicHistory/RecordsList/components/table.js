import React from "react"
import Table from '../../../../../components/table/table';
import Dropdown from "./dropdown"
import moment from "moment";

const tableRecords = props => {

  const data = props
    .patient.clinicalRecords
    .map(record => ({
      key: record._id,
      date: moment(record.controlDate).format("DD/MM/YYYY"),
      user: record.user.username,
      height: record.height,
      weight: record.weight,
      pc: record.pc,
      ppc: record.ppc
    }))

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
    }
  ]

  const check = (permission) => {
    return props
      .user
      .permissions
      .includes(permission)
  }

  if (check('control_show') || check('control_update') || check('control_destroy')) {
    columns.push({
      title: "Acciones",
      key: "action",
      align: "center",
      fixed: "right",
      width: 120,
      render: (text, record) => (<Dropdown
        user={props.user}
        onOk={props.onDeleteRecord}
        patient={props.patient}
        record={record}/>)
    })
  }

  return (<Table
    columns={columns}
    dataSource={data}
    loading={props.loading}
    scroll={{x: 450}}
    />)
}

export default tableRecords
