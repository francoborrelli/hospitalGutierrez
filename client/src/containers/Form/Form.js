import React, { Component } from "react"
import { Form, Button, Row } from "antd"
import Input from "./formItem"
import SearchItem from "./searchItem"
import NormalItem from "./normalItem"

const FormItem = Form.Item

class BaseForm extends Component {
  componentDidMount = () => {
    this.props.form.setFieldsValue(this.props.values)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if ((prevProps.fields !== this.props.fields) && (this.props.track)){
      const key = this.props.track
      this.props.form.setFieldsValue({[key]: "1" })
    }
  }

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
    const Wrapper = this.props.inline ? SearchItem : NormalItem

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
    let backButton = this.props.onBack ? (
      <Button style={{ float: "right", marginLeft: 10 }} onClick={this.props.onBack}>
        Volver
      </Button>
    ) : null

    return (
      <Form className={this.props.className} onSubmit={this.submitHandler}>
        <Row>{this.getFields(this.props.fields)}</Row>
        <FormItem>
          {backButton}
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
