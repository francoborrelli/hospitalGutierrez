import React, { Component } from "react"
import { Input, Select, Checkbox, InputNumber } from "antd"
import DatePicker from "../../components/datePicker/datePicker"

class Item extends Component {
  getInput = (item, added) => (
    <Input
      placeholder={item.label}
      addonBefore={added}
      autoComplete="true"
      {...item.props}
    />
  )

  getSelect = item => {
    const Option = Select.Option
    const options = item.options.map(d => (
      <Option key={d.id} value={d.id}>
        {d.nombre}
      </Option>
    ))
    return <Select {...item.props}>{options}</Select>
  }

  getDatePicker = item => <DatePicker {...item.props} />


  getInputNumber = item => (
    <InputNumber
    {...item.props}
    formatter={value => value ? `${Math.round(value)}`: ''}
    />
  )

  getCheckbox = item => <Checkbox> {item.text} </Checkbox>

  getRules = item => {
    const rules = item.rules ? item.rules : []
    return item.customValidator
      ? [
          {
            validator: (rule, value, callback) =>
              item.customValidator(this.props.form, rule, value, callback)
          },
          ...rules
        ]
      : rules
  }

  wrapItem = (item, field) =>
    this.props.decorator(item.name, {
      initialValue: item.defaultValue,
      rules: this.getRules(item)
    })(field)

  render() {
    const item = this.props.item

    let result

    switch (item.type) {
      case "input":
        result = this.getInput(item)
        break
      case "select":
        result = this.getSelect(item)
        break
      case "select-input":
        const select = this.wrapItem(item.select, this.getSelect(item.select))
        result = this.getInput(item, select)
        break
      case "checkbox":
        result = this.getCheckbox(item)
        break
      case "datePicker":
        result = this.getDatePicker(item)
        break
      case "inputNumber":
        result = this.getInputNumber(item)
        break
      default:
        return null
    }
    return this.wrapItem(item, result)
  }
}

export default Item
