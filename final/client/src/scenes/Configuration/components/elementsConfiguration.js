import React, {Component} from "react"

import {InputNumber, Card, Form, Button} from "antd"

const FormItem = Form.Item

class elementsNumberForm extends Component {
  handler = (e) => {
    e.preventDefault()
    const data = this.props.form.getFieldsValue()
    this.props.submitted(data)
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Card title="Elementos por página">
        <div style={{ textAlign: "center", padding: "3px 0px" }}>
        <Form
          layout="inline"
          style={{textAlign: "center"}}
          onSubmit={this.handler}>
          <FormItem
            style={{margin: 0,width: "51.5%"}}
            wrapperCol={{style: {width: "100%"}}}
          >
            {getFieldDecorator('listAmount', {initialValue: this.props.value})(
            <InputNumber
              min={1}
              max={1000}
              style={{width: "100%"}}
              formatter={value => value ? `${Math.round(value)}` : '1'}/>)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.props.loading}
              style={{marginLeft: 10, width: "100%"}}>
              Guardar
            </Button>
          </FormItem>
        </Form>
      </div>
      </Card>
    )
  }

}

export default Form.create()(elementsNumberForm);
