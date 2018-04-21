import React from "react"

import { Form } from "antd"

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    md: { span: 24 },
    lg: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 24 },
    lg: { span: 18 }
  }
}

const item = props => <FormItem {...formItemLayout} label={props.label}>{props.children}</FormItem>


export default item
