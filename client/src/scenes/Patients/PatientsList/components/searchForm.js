import React from "react"
import Form from "../../../../containers/Form/Form"

const searchForm = props => {

  const fields = {
    lastname: {
      name: "lastname",
      label: "Apellido",
      type: "input",
      rules: [
        {
          message: "Debe tener solo letras",
          pattern: "^[a-zA-Z ]+$",
        }
      ]
    },
    name: {
      name: "name",
      label: "Nombre",
      type: "input",
      rules: [
        {
          message: "Debe tener solo letras",
          pattern: "^[a-zA-Z ]+$",
        }
      ]
    },
    document: {
      name: "documentNumber",
      type: "select-input",
      label: "Documento",
      select: {
        type: "select",
        name: "documentType",
        props: {
          style: { width: 70 },
        },
        options: props.documentTypes
      },
      input: {
        type: "input",
        label: "Número"
      }
    },
    state: {
      name: "state",
      label: "Estado",
      type: "select",
      options: [
        { id: "active", nombre: "Activo" },
        { id: "deleted", nombre: "Eliminado" }
      ]
    }
  }

  return <Form fields={fields} {...props} inline buttonText="Buscar"/>
}

export default searchForm
