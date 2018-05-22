import React from "react"
import {Layout, Row, Col, Divider, Avatar} from 'antd';

const {Header, Content} = Layout

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
              {props.patient.name} {props.patient.lastname}
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
            <h3>{props.patient.age}</h3>
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
