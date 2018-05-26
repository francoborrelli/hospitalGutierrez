import React from "react"

import {Card} from "antd"

import Form from "../../../../containers/Form/Form"
import withValidations from "../../hoc/withValidators"


const personalDataForm = props => {
  const fields = {
    name: {
      name: "name",
      label: "Nombre",
      type: "input",
      rules: [
        {
          required: true,
          whitespace: true,
          message: "Ingrese el nombre"
        }, {
          message: "Debe tener solo letras",
          pattern: "^[a-zA-Z ]+$"
        }
      ]
    },
    lastname: {
      name: "lastname",
      label: "Apellido",
      type: "input",
      rules: [
        {
          required: true,
          whitespace: true,
          message: "Ingrese el apellido"
        }, {
          message: "Debe tener solo letras",
          pattern: "^[a-zA-Z ]+$"
        }
      ]
    },
    username: {
      name: "username",
      label: "Nombre de Usuario",
      type: "input",
      rules: [
        {
          required: true,
          whitespace: true,
          message: "Ingrese el nombre de usuario"
        }, {
          pattern: "^[a-zA-Z0-9]+$",
          message: "Ingrese un nombre de usuario válido"
        }
      ],
      customValidator: props.usernameValidator
    },
    email: {
      name: "email",
      label: "Email",
      type: "input",
      rules: [
        {
          required: true,
          whitespace: true,
          message: "Ingrese el email"
        }, {
          type: "email",
          message: "Ingrese un email válido"
        }
      ],
      customValidator: props.emailValidator
    }
  }

  return <Card title="Datos Personales" bodyStyle={{padding: "37px 32px"}}>
    <Form
    reset
    layout="vertical"
    fields={fields}
    {...props}
    />
  </Card>

}

export default withValidations(personalDataForm)
