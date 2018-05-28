import React, {Component} from "react"
import {Card, Icon, Button} from "antd"
import Table from "./components/table"
import {Link} from 'react-router-dom';
import hasPermission from '../../../../hoc/hasPermission';

class ClinicHistoryList extends Component {

  state = {
    loading: true,
    clinicHistory: [
      {
        _id: "1",
        date: "11/45/2016",
        user: {
          firstName: "Franco",
          lastName: "Borrelli"
        },
        weight: "10",
        height: "102",
        pc: "23",
        ppc: "32"
      }
    ]
  }

  componentDidMount = () => {
    //request clinic History
    this.setState({loading: false})
  }

  render() {
    const extra = this.props
      .user
      .permissions
      .includes('control_new')
      ? <Link to={this.props.patient.id + '/addRecord'}>
          <Button size="small">
            <Icon type="user-add"/>
            Agregar
          </Button>
        </Link>
      : null

    return (
      <Card title="Historia Clínica" extra={extra}>
        <Table
          data={this.state.clinicHistory}
          user={this.props.user}
          patient={this.props.patient}
          onDeleteRecord={this.props.onDeleteRecord}/>
      </Card>
    )
  }
}

export default ClinicHistoryList
