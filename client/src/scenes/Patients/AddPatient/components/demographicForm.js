import React from "react"
import Form from "../../../../containers/Form/Form"

const geographicForm = props => {
  const fields = {
    houseTypes: {
      name: "houseType",
      label: "Tipo de Vivienda",
      type: "select",
      props: {
        placeholder: "Tipo de Vivienda"
      },
      options: props.data.houseTypes || [],
      rules: [
        {
          required: true,
          message: "Seleccione una opción"
        }
      ]
    },
    heatingTypes: {
      name: "heatingTypes",
      label: "Tipo de Calefacción",
      type: "select",
      props: {
        placeholder: "Tipo de Calefacción"
      },
      options: props.data.heatingTypes || [],
      rules: [
        {
          required: true,
          message: "Seleccione una opción"
        }
      ]
    },
    waterTypes: {
      name: "waterType",
      label: "Tipo de Agua",
      type: "select",
      props: {
        placeholder: "Tipo de Agua"
      },
      options: props.data.waterTypes || [],
      rules: [
        {
          required: true,
          message: "Seleccione una opción"
        }
      ]
    },
    fridge: {
      name: "fridge",
      label: "¿Tiene Heladera?",
      type: "select",
      props: {
        placeholder: "¿Tiene Heladera?"
      },
      options: [{ id: 0, nombre: "Si" }, { id: 1, nombre: "No" }],
      rules: [
        {
          required: true,
          message: "Seleccione una opción"
        }
      ]
    },
    electricity: {
      name: "electricity",
      label: "¿Tiene Electricidad?",
      type: "select",
      props: {
        placeholder: "¿Tiene Electricidad?"
      },
      options: [{ id: 0, nombre: "Si" }, { id: 1, nombre: "No" }],
      rules: [
        {
          required: true,
          message: "Seleccione una opción"
        }
      ]
    },
    pets: {
      name: "pets",
      label: "¿Tiene Mascotas?",
      type: "select",
      props: {
        placeholder: "¿Tiene Mascotas?"
      },
      options: [{ id: 0, nombre: "Si" }, { id: 1, nombre: "No" }],
      rules: [
        {
          required: true,
          message: "Seleccione una opción"
        }
      ]
    }
  }

  return (
    <Form
      fields={fields}
      {...props}
      buttonText="Continuar"
      loading={props.loading}
      onBack={props.prevStep}
    />
  )
}

export default geographicForm
