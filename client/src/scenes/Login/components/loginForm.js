import React from "react"
import {Icon} from "antd"
import Form from "../../../containers/Form/Form"

const loginForm = props => {
  const style = { color: "rgba(0,0,0,.25)" }
  const userIcon = <Icon type="user" style={style} />
  const passIcon = <Icon type="lock" style={style} />

  const fields = {
    username: {
      name: "username",
      type: "input",
      props: {
        placeholder: "Nombre de usuario",
        prefix: userIcon
      },
      rules: [
        {
          message: "Introduzca su nombre de usuario",
          required: true
        }
      ]
    },
    password: {
      name: "pass",
      type: "input",
      props: {
        placeholder: "Contraseña",
        prefix: passIcon,
        type: "password"
      },
      rules: [
        {
          message: "Introduzca su contraseña",
          required: true
        }
      ]
    },
    checkbox: {
      name: "remember",
      type: "checkbox",
      text: "Recordarme",
    }
  }
  return <Form fields={fields} buttonText="Iniciar Sesión" {...props} />
}

export default loginForm
