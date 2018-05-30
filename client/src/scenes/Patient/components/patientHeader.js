import React from "react"
import {Layout, Row, Col, Divider, Avatar} from 'antd';
import moment from "moment"

const {Header, Content} = Layout

const getAge = (birthday) => {
  const date = moment(birthday)
  const years = moment().diff(birthday, 'years')
  date.add(years, "years")
  const months = moment().diff(birthday, 'months')
  date.add(months, "months")
  const days = moment().diff(birthday, 'days')
  let result = years !== 0 ? years + ' ' +  (years !== 1 ? 'años' : 'año') : ""
  result += months !== 0 ? months + ' ' +  (months !== 1 ? 'meses' : 'mes') : ""
  result += days + ' ' + (days !== 1 ? 'días' : 'día')

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
              {props.patient.documentType} - {props.patient.documentNumber}
            </h5>
          </div>
        </div>
      </Col>
      <Col sm={11}>
        <div style={{
          display: "flex",
          float: "right",
          paddingTop: 13,
          paddingRight: 25,
          textAlign: "right"
        }}>
          <div>
            <h5 style={{color: "rgba(0,0,0,.45)"}}>Edad</h5>
            <h3>{getAge(props.patient.birthday)}</h3>
          </div>
          <Divider style={{margin: "0 15px", height: 39}} type="vertical"/>
          <div>
            <h5 style={{ color: "rgba(0,0,0,.45)"}}>Consultas</h5>
            <h3>{props.patient.visits}</h3>
          </div>
        </div>
      </Col>
    </Row>
  </Header>
  {props.children}
</Content>
)

export default patientHeader
