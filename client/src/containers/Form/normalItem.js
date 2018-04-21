import React from "react"

import { Form } from "antd"

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 }
  }
}

const item = props => <FormItem {...formItemLayout} label={props.label}>{props.children}</FormItem>


export default item
