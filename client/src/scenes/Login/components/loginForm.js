import React from "react"
import Icon from "../../../components/icon/icon"
import Form from "../../../containers/Form/Form"

const loginForm = props => {
  const userIcon = <Icon type="user" />
  const passIcon = <Icon type="lock" />

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
      text: "Recordarme"
    }
  }
  return <Form fields={fields} layout="inline" buttonText="Iniciar Sesión" {...props} />
}

export default loginForm
