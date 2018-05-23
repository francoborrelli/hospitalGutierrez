import React from "react"
import {Col, Divider} from "antd"

const element = props => (
  <Col {...props}>
    <div><h5 style={{color: "rgba(0,0,0,.45)"}}>{props.title}</h5></div>
    <div>{props.data}</div>
    <Divider/>
  </Col>
)

export default element
