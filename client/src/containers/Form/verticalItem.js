import React from "react"

import {Form} from "antd"

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xl: {
      span: 24
    }
  },
  wrapperCol: {
    xl: {
      span: 24
    }
  }
}

const item = props => <FormItem {...formItemLayout} label={props.label}>
  {props.children}
</FormItem>

export default item
