import React from "react"
import { Form, Col} from "antd"

const FormItem = Form.Item

const item = props => (
  <Col xs={24} md={12} xl={24} span={8}>
    <FormItem label={props.label}>{props.children}</FormItem>
  </Col>
)

export default item
