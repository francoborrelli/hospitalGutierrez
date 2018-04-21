import React from "react"
import Form from "../../../../containers/Form/Form"

const personalDataForm = props => {

  const documentValidator = (form, rule, documentNumber, callback) => {
    const documentType = form.getFieldValue("documentType")

    //request

    if (documentNumber === 4) {
      callback("El documento ya se encuentra registrado en el sistema")
    }
    callback()
  }

  const revalidate = (form, rule, documentNumber, callback) => {
    form.validateFields(["documentNumber"])
    callback()
  }

  const fields = {
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
    document: {
      name: "documentNumber",
      type: "select-input",
      label: "Documento",
      rules: [
        {
          required: true,
          whitespace: true,
          message: "Ingrese el documento"
        }
      ],
      customValidator: documentValidator,
      select: {
        type: "select",
        name: "documentType",
        props: {
          style: { width: 70 },
          placeholder: "Tipo",
          required: true
        },
        customValidator: revalidate,
        options: props.data.documentTypes
      },
      input: {
        type: "input",
        label: "Número"
      }
    },
    birthday: {
      name: "birthday",
      label: "Fecha de Nacimiento",
      type: "datePicker",
      props: {
        placeholder: "Fecha de Nacimiento"
      },
      rules: [
        {
          type: "object",
          required: true,
          message: "Ingrese la fecha de nacimiento"
        }
      ]
    },
    gender: {
      name: "gender",
      label: "Género",
      type: "select",
      props: {
        placeholder: "Género"
      },
      options: [{ id: 0, nombre: "Másculino" }, { id: 1, nombre: "Femenino" }],
      rules: [{ required: true, message: "Seleccione un género" }]
    },
    address: {
      name: "address",
      label: "Dirección",
      type: "input",
      rules: [
        { required: true, whitespace: true, message: "Ingrese la dirección" }
      ]
    },
    insurances: {
      name: "insurence",
      label: "Obras Social",
      type: "select",
      props: {
        placeholder: "Obra Social"
      },
      options: props.data.insurances
    },
    phone: {
      name: "phone",
      label: "Teléfono",
      type: "input",
      rules: [
        {
          pattern: "^([+]{1})?[0-9 -/]*$",
          message: "Ingrese un teléfono válido"
        }
      ]
    }
  }

  return (
    <Form
      fields={fields}
      {...props}
      buttonText="Continuar"
      track="documentType"
    />
  )
}

export default personalDataForm
