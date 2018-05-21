import React from "react"
import {Card} from 'antd';
import Form from "../../../../containers/Form/Form"

const searchForm = props => {
  const fields = {
    lastname: {
      name: "lastname",
      type: "input",
      rules: [
        {
          message: "Debe tener solo letras",
          pattern: "^[a-zA-Z ]+$"
        }
      ],
      props: {
        placeholder: "Apellido"
      }
    },
    name: {
      name: "name",
      type: "input",
      rules: [
        {
          message: "Debe tener solo letras",
          pattern: "^[a-zA-Z ]+$"
        }
      ],
      props: {
        placeholder: "Nombre"
      }
    },
    document: {
      name: "documentNumber",
      type: "select-input",
      props: {
        placeholder: "Número de Documento"
      },
      select: {
        type: "select",
        name: "documentType",
        props: {
          style: {
            width: 70
          },
          placeholder: "Tipo",
          allowClear: true
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
      type: "select",
      props: {
        placeholder: "Estado",
        allowClear: true
      },
      options: [
        {
          id: "active",
          nombre: "Activo"
        }, {
          id: "deleted",
          nombre: "Eliminado"
        }
      ]
    }
  }

  return (
    <Card title="Búsqueda">
      <Form
        className="ant-advanced-search-form"
        fields={fields}
        {...props}
        inline
        buttonText="Buscar"/>
    </Card>
  )
}

export default searchForm
