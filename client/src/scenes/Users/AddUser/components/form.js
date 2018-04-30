import React from "react"
import Form from "../../../../containers/Form/Form"

//Custom Validators

const emailValidator = (form, rule, email, callback) => {
  return new Promise((resolve, reject) => {
    //Change Timeout for request
    setTimeout(resolve, 1000)
  })
    .then(() => {
      if (email === 4) {
        callback("El email ya se encuentra registrado en el sistema")
      }
      callback()
    })
    .catch()
}

const usernameValidator = (form, rule, username, callback) => {
  return new Promise((resolve, reject) => {
    //Change Timeout for request
    setTimeout(resolve, 1000)
  })
    .then(() => {
      if (username === "franco") {
        callback(
          "El nombre de usuario ya se encuentra registrado en el sistema"
        )
      }
      callback()
    })
    .catch()
}

const compareToFirstPassword = (form, rule, value, callback) => {
  if (value && value.length > 6 && value !== form.getFieldValue("password")) {
    callback("Las contraseñas no son iguales")
  } else {
    callback()
  }
}

const revalidate = (form, rule, value, callback) => {
  const field = form.getFieldValue("confirmPass")
  if (field) {
    form.validateFields(["confirmPass"], { force: true })
  }
  callback()
}

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
      customValidator: usernameValidator
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
      customValidator: emailValidator
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
      customValidator: revalidate
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
      customValidator: compareToFirstPassword
    },
    roles: {
      name: "roles",
      label: "Roles",
      type: "select",
      options: props.roles,
      props: {
        mode: "multiple",
        placeholder: "Roles"
      }
    }
  }

  return <Form fields={fields} {...props} buttonText="Confirmar" />
}

export default addUserForm
