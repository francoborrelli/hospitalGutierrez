import React from "react"
import {Layout, Row, Col, Avatar, Icon, Tooltip, Button} from 'antd';
import moment from "moment"
import {withRouter} from "react-router-dom"
import Divider from "../../../components/divider/divider"

const {Header, Content} = Layout

const getAge = (birthday) => {
  const date = moment(birthday)
  const years = moment().diff(birthday, 'years')
  date.add(years, "years")
  const months = moment().diff(date, 'months')
  date.add(months, "months")
  const days = moment().diff(date, 'days')

  let result = ""
  if (years){
    result = years !== 0 ? years + ' ' +  (years !== 1 ? 'años ' : 'año ') : ""
    result += months !== 0 ? months + ' ' +  (months !== 1 ? 'meses ' : 'mes ') : ""
  }else{
    result += months !== 0 ? months + ' ' +  (months !== 1 ? 'meses ' : 'mes ') : ""
    if (days !== 0){
      result += days + ' ' + (days !== 1 ? 'días' : 'día')
    }
  }
  return result
}

const patientHeader = props => (
<Content>
  <Header style={{height: "auto"}}>
    <Row>
      <Col sm={13}>
        <div style={{display: "flex"}}>
          <div style={{paddingLeft: 20}}>
            <Avatar size="large" icon="user"/>
          </div>
          <div style={{paddingTop: 14, paddingLeft: 10}}>
            <h2 style={{margin: 0}}>
              {props.patient.firstName} {props.patient.lastName}
            </h2>
            <h5 style={{color: "rgba(0,0,0,.45)"}}>
              {props.patient.documentName} - {props.patient.documentNumber}
            </h5>
          </div>
        </div>
      </Col>
      <Col sm={11}>
        <div style={{display: "flex", float: "right", paddingTop: 13,paddingRight: 25, textAlign: "right"}}>
          <div>
            <h5 style={{color: "rgba(0,0,0,.45)"}}>Edad</h5>
            <h3>{getAge(props.patient.birthday)}</h3>
          </div>
          <Divider/>
          <div>
            <h5 style={{ color: "rgba(0,0,0,.45)"}}>Consultas</h5>
            <h3>{props.patient.visits}</h3>
          </div>
          <Divider/>
          <div style={{verticalAlign: "text-bottom", height: 45, marginTop: -3}}>
        <Tooltip placement="right" title="Volver">
          <Button style={{verticalAlign: "text-bottom"}} onClick={() => props.goBackTo ? props.history.push(props.goBackTo) : props.history.goBack()}><Icon type="rollback"/></Button>
        </Tooltip>
      </div>
        </div>
      </Col>
    </Row>
  </Header>
  {props.children}
</Content>
)

export default withRouter(patientHeader)
