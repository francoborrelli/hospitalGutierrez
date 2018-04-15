import React, { Component } from "react"
import { Form, Button, Row } from "antd"
import Input from "./formItem"
import SearchItem from "./searchItem"

const FormItem = Form.Item

class BaseForm extends Component {
  submitHandler = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitted(values)
      }
    })
  }
  getFields = fields => {
    const { getFieldDecorator } = this.props.form
    const Wrapper = this.props.inline ? SearchItem : Form.Item

    const items = []
    for (let key in fields) {
      items.push({
        id: key,
        config: fields[key]
      })
    }
    const inputs = items.map((item, key) => {
      return (
        <Wrapper key={key} label={item.config.label}>
          {getFieldDecorator(item.config.name, { rules: item.config.rules })(
            <Input key={key} item={item.config} decorator={getFieldDecorator} />
          )}
        </Wrapper>
      )
    })

    return inputs
  }

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.submitHandler}>
        <Row>{this.getFields(this.props.fields)}</Row>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ float: "right" }}
            loading={this.props.loading}
          >
            {this.props.buttonText}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(BaseForm)
