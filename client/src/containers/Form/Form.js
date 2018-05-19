import React, { Component } from "react"
import { Form, Button, Row } from "antd"
import Input from "./formItem"
import SearchItem from "./inputLayouts/searchItem"
import NormalItem from "./inputLayouts/normalItem"
import VerticalItem from "./inputLayouts/verticalItem"

import PropTypes from 'prop-types';

const FormItem = Form.Item

class BaseForm extends Component {
  componentDidMount = () => {
    this.props.form.setFieldsValue(this.props.defaultValues)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.fields !== this.props.fields && this.props.track) {
      const key = this.props.track
      this.props.form.setFieldsValue({ [key]: "1" })
    }
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submitted(values)
      }
    })
  }

  getFields = fields => {
    const { getFieldDecorator } = this.props.form
    let Wrapper = this.props.inline ? SearchItem : NormalItem
    Wrapper = this.props.vertical ? VerticalItem : Wrapper
    const items = []
    for (let key in fields) {
      items.push({
        id: key,
        config: fields[key]
      })
    }
    const inputs = items.map((item, key) => {
      const rules = this.getRules(item.config)
      return (
        <Wrapper key={key} label={item.config.label}>
          {getFieldDecorator(item.config.name, { rules: rules })(
            <Input
              key={key}
              item={item.config}
              decorator={getFieldDecorator}
              form={this.props.form}
            />
          )}
        </Wrapper>
      )
    })

    return inputs
  }

  getRules = item => {
    return item.customValidator
      ? [
          {
            validator: (rule, value, callback) =>
              item.customValidator(this.props.form, rule, value, callback)
          },
          ...item.rules
        ]
      : item.rules
  }

  render() {
    let backButton = this.props.onBack ? (
      <Button
        style={{ float: "right", marginLeft: 10 }}
        onClick={() => this.props.onBack(this.props.form.getFieldsValue())}
      >
        Volver
      </Button>
    ) : null

    return (
      <Form
        className={this.props.className}
        onSubmit={this.submitHandler}
        style={this.props.style}
      >
        <Row>{this.getFields(this.props.fields)}</Row>
        <FormItem>
          {backButton}
          <Button
            type="primary"
            htmlType="submit"
            style={{ float: "right" }}
            loading={this.props.loading}
          >
            {this.props.buttonText ? this.props.buttonText : "Guardar"}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

BaseForm.propTypes = {
  defaultValues: PropTypes.object,
  fields: PropTypes.object.isRequired,
  submitted: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string
}

export default Form.create()(BaseForm)
