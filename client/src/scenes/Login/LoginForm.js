import React, { Component } from "react"
import { Form, Icon, Input, Button, Checkbox, message } from "antd"
import { withRouter } from "react-router-dom"

const FormItem = Form.Item

class NormalLoginForm extends Component {
  state = {
    enterLoading: false
  }

  submitHandler = e => {
    e.preventDefault()
    this.setState({ enterLoading: true })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.history.push("/")
        message.success("Sesión iniciada correctamente.", 3)
      }
    })
    this.setState({ enterLoading: false })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.submitHandler} className="login-form">
        <FormItem>
          {getFieldDecorator("userName", {
            rules: [
              { required: true, message: "Introduzca su nombre de usuario" }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Nombre de usuario"
              autoComplete="true"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Introduzca su contraseña" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Contraseña"
              autoComplete="false"
            />
          )}
        </FormItem>
        <br />
        <FormItem>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: false
          })(<Checkbox>Recordarme</Checkbox>)}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ float: "right" }}
            loading={this.state.enterLoading}
          >
            Iniciar Sesión
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const LoginForm = Form.create()(NormalLoginForm)

export default withRouter(LoginForm)
