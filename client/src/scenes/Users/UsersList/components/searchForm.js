import React from "react"
import Form from "../../../../containers/Form/Form"

const searchForm = props => {
  const fields = {
    username: {
      name: "username",
      props: {
        placeholder: "Nombre de Usuario"
      },
      type: "input"
    },
    state: {
      name: "state",
      type: "select",
      props: {
        placeholder: "Estado",
        allowClear: true
      },
      options: [
        { id: "active", nombre: "Activo" },
        { id: "deleted", nombre: "Bloqueado" }
      ]
    }
  }

  return (
    <Form
      className="ant-advanced-search-form"
      fields={fields}
      {...props}
      inline
      buttonText="Buscar"
    />
  )
}

export default searchForm
