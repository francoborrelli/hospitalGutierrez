import React, {Component} from "react"
import { Card, Icon, Button } from "antd"
import Table from "./components/table"
import { Link } from 'react-router-dom';

class ClinicHistoryList extends Component {


  componentDidMount = () => {
  }

  render() {
    const extra = <Link to="/">
    <Button onClick="/" size="small" type="primary">
      <Icon type="user-add"/>
    </Button>
    </Link>

    return (
      <Card title="Historia Clínica" extra={extra}>
        <Table/>
      </Card>
    )
  }
}

export default ClinicHistoryList
