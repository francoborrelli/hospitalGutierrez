import React from "react"
import Form from "../../../../containers/Form/Form"
import withValidations from "../../hoc/withValidators"

const addUserForm = props => {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        { type: "email", message: "Ingrese un email válido" }
      ],
      customValidator: props.emailValidator
    },
    password: {
      name: "password",
      label: "Contraseña",
      type: "input",
      props: {
        type: "password"
      },
      rules: [
        {
          required: true,
          whitespace: true,
          message: "Ingrese la contraseña"
        },
        { min: 6, message: "Debe tener al menos 6 caracteres" }
      ],
      customValidator: props.revalidate
    },
    confirmPassword: {
      name: "confirmPass",
      label: "Confirmar Contraseña",
      type: "input",
      props: {
        type: "password"
      },
      rules: [
        {
          required: true,
          whitespace: true,
          message: "Reingrese la contraseña"
        },
        { min: 6, message: "Debe tener al menos 6 caracteres" }
      ],
      customValidator: props.compareToFirstPassword
    },
    roles: {
      name: "roles",
      label: "Roles",
      type: "select",
      options: props.roles,
      rules: [{required: true, message: "Debe tener un rol"}],
      props: {
        mode: "multiple",
        placeholder: "Roles"
      }
    }
  }

  return <Form fields={fields} layout="vertical" {...props} buttonText="Confirmar" />
}

export default withValidations(addUserForm)
