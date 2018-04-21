import React, { Component } from "react"
import { Input, Select, Checkbox } from "antd"
import DatePicker from "../../components/datePicker/datePicker"

class Item extends Component {

  getInput = (item, added) => <Input
      placeholder={item.label}
      addonBefore={added}
      autoComplete="true"
      {...item.props}
    />

  getSelect = item => {
    const Option = Select.Option
    const options = item.options.map((d) => (<Option key={d.id} value={d.id}>{d.nombre}</Option>))
    return <Select {...item.props}>{options}</Select>
  }

  getDatePicker = item => {
    return <DatePicker {...item.props}/>
  }

  getCheckbox = item => <Checkbox> {item.text} </Checkbox>

  wrapItem = (item, field ) => this.props.decorator(item.name, {initialValue: item.defaultValue, rules: item.rules})(field)

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
      default:
        return null
    }

    return this.wrapItem(item, result)
  }
}

export default Item
