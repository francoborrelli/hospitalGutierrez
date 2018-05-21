import React from "react"

const withValidators = (WrappedComponent) => {

  const emailValidator = (form, rule, email, callback) => {
    return new Promise((resolve, reject) => {
      //Change Timeout for request
      setTimeout(resolve, 1000)
    }).then(() => {
      if (email === 4) {
        callback("El email ya se encuentra registrado en el sistema")
      }
      callback()
    }).catch()
  }

  const usernameValidator = (form, rule, username, callback) => {
    return new Promise((resolve, reject) => {
      //Change Timeout for request
      setTimeout(resolve, 1000)
    }).then(() => {
      if (username === "franco") {
        callback("El nombre de usuario ya se encuentra registrado en el sistema")
      }
      callback()
    }).catch()
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
      form.validateFields(["confirmPass"], {force: true})
    }
    callback()
  }

  return (props) => (<WrappedComponent
    emailValidator={emailValidator}
    usernameValidator={usernameValidator}
    compareToFirstPassword={compareToFirstPassword}
    revalidate={revalidate}
    {...props}/>);
};

export default withValidators
