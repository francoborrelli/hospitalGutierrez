import React from "react"

import {Form} from "antd"

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    lg: {
      span: 24
    },
    xl: {
      span: 6
    }
  },
  wrapperCol: {
    lg: {
      span: 24
    },
    xl: {
      span: 18
    }
  }
}

const item = props => <FormItem {...formItemLayout} label={props.label}>
  {props.children}
</FormItem>

export default item
