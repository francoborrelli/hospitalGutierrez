import React, {Component} from "react"
import {Form, Button, Row} from "antd"
import Input from "./formItem"
import SearchItem from "./inputLayouts/searchItem"
import NormalItem from "./inputLayouts/normalItem"
import VerticalItem from "./inputLayouts/verticalItem"

import PropTypes from 'prop-types';

const FormItem = Form.Item

class BaseForm extends Component {
  state = {
    initialState: {}
  }

  setDefaultState = () => {
    this
      .props
      .form
      .setFieldsValue(this.props.defaultValues)
    this.setState({
      initialState: this
        .props
        .form
        .getFieldsValue()
    })
  }

  componentDidMount = () => {
    this.setDefaultState()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.defaultValues !== this.props.defaultValues) {
      this.setDefaultState()
      this.setState({
        initialState: this
          .props
          .form
          .getFieldsValue()
      })
    }
    if (prevProps.fields !== this.props.fields && this.props.track) {
      const keys = this.props.track
      keys.forEach(key => {
        let value = this.props.defaultValues
          ? this.props.defaultValues[key]
          : "1"
        this
          .props
          .form
          .setFieldsValue({[key]: value})
      });
    }
  }

  submitHandler = e => {
    e.preventDefault()
    this
      .props
      .form
      .validateFieldsAndScroll((err, values) => {
        if (!err) {
          this
            .props
            .submitted(values)
          this.setState({initialState: values})
        }
      })
  }

  resetHandler = () => {
    this
      .props
      .form
      .setFieldsValue(this.state.initialState)
  }

  getWrapper = () => {
    switch (this.props.layout) {
      case "inline":
        return SearchItem
      case "vertical":
        return VerticalItem
      default:
        return NormalItem
    }
  }

  getFields = fields => {
    const {getFieldDecorator} = this.props.form
    let Wrapper = this.getWrapper()
    const items = []
    for (let key in fields) {
      items.push({id: key, config: fields[key]})
    }
    const inputs = items.map((item, key) => {
      const rules = this.getRules(item.config)
      return (
        <Wrapper key={key} label={item.config.label}>
          {getFieldDecorator(item.config.name, {rules: rules})(<Input
            key={key}
            item={item.config}
            decorator={getFieldDecorator}
            form={this.props.form}/>)}
        </Wrapper>
      )
    })

    return inputs
  }

  getRules = item => {
    return item.customValidator
      ? [
        {
          validator: (rule, value, callback) => item.customValidator(this.props.form, rule, value, callback)
        },
        ...item.rules
      ]
      : item.rules
  }

  getBackButton = () => {
    return this.props.onBack
      ? (
        <Button
          style={{
          float: "right",
          marginRight: 10
        }}
          onClick={() => this.props.onBack(this.props.form.getFieldsValue())}>
          Volver
        </Button>
      )
      : null
  }

  getResetButton = () => {
    return this.props.reset
      ? (
        <Button
          style={{
          float: "right",
          marginRight: 10
        }}
          onClick={this.resetHandler}>
          Restaurar
        </Button>
      )
      : null
  }

  getCancelButton = () => {
    return this.props.onCancel
      ? (
        <Button
          style={{
          float: "right",
          marginRight: 10
        }}
          onClick={this.props.onCancel}>
          Cancelar
        </Button>
      )
      : null
  }

  render() {
    let backButton = this.getBackButton()
    let resetButton = this.getResetButton()
    let cancelButton = this.getCancelButton()
    return (
      <Form
        className={this.props.className}
        onSubmit={this.submitHandler}
        style={this.props.style}>
        <Row>{this.getFields(this.props.fields)}</Row>
        <FormItem style={{
          margin: 0
        }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
            float: "right"
          }}
            loading={this.props.loading}>
            {this.props.buttonText
              ? this.props.buttonText
              : "Guardar"}
          </Button>
          {resetButton}
          {cancelButton}
          {backButton}
        </FormItem>
      </Form>
    )
  }
}

BaseForm.propTypes = {
  layout: PropTypes.string,
  fields: PropTypes.object.isRequired,
  submitted: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string
}

export default Form.create()(BaseForm)
