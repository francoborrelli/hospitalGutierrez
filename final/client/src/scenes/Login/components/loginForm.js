import React from "react"
import Icon from "../../../components/icon/icon"
import Form from "../../../containers/Form/Form"

const loginForm = props => {
  const userIcon = <Icon type="user" />
  const passIcon = <Icon type="lock" />

  const fields = {
    username: {
      name: "email",
      type: "input",
      props: {
        placeholder: "Email",
        prefix: userIcon
      },
      rules: [
        {
          message: "Introduzca su email",
          required: true
        }
      ]
    },
    password: {
      name: "password",
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
    }
  }
  return <Form fields={fields} layout="vertical" buttonText="Iniciar Sesión" {...props} />
}

export default loginForm
