import React from "react"
import {Card, Icon, Button} from "antd"
import Table from "./components/table"
import {Link} from 'react-router-dom';

const clinicHistoryList = props => {

  const extra = <Link to={props.patient.id + '/addRecord'}>
    <Button size="small" type="primary">
      <Icon type="user-add"/>
    </Button>
  </Link>

  return (
    <Card title="Historia Clínica" extra={extra}>
      <Table patient={props.patient} onDeleteRecord={props.onDeleteRecord}/>
    </Card>
  )
}

export default clinicHistoryList
