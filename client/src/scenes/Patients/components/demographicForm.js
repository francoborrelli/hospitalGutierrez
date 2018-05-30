import React from "react"
import Form from "../../../containers/Form/Form"

const demographicForm = props => {
  const fields = {
    houseType: {
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
    heatingType: {
      name: "heatingType",
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
    waterType: {
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
      name: "hasRefrigerator",
      label: "¿Tiene Heladera?",
      type: "select",
      props: {
        placeholder: "¿Tiene Heladera?"
      },
      options: [
        {
          id: 1,
          nombre: "Si"
        }, {
          id: 0,
          nombre: "No"
        }
      ],
      rules: [
        {
          required: true,
          message: "Seleccione una opción"
        }
      ]
    },
    electricity: {
      name: "hasElectricity",
      label: "¿Tiene Electricidad?",
      type: "select",
      props: {
        placeholder: "¿Tiene Electricidad?"
      },
      options: [
        {
          id: 1,
          nombre: "Si"
        }, {
          id: 0,
          nombre: "No"
        }
      ],
      rules: [
        {
          required: true,
          message: "Seleccione una opción"
        }
      ]
    },
    pets: {
      name: "hasPet",
      label: "¿Tiene Mascotas?",
      type: "select",
      props: {
        placeholder: "¿Tiene Mascotas?"
      },
      options: [
        {
          id: 1,
          nombre: "Si"
        }, {
          id: 0,
          nombre: "No"
        }
      ],
      rules: [
        {
          required: true,
          message: "Seleccione una opción"
        }
      ]
    }
  }
  let values;
  const patient = props.patient
  if (patient) {
    values = {
      hasRefrigerator: patient.hasRefrigerator,
      hasPet: patient.hasPet,
      hasElectricity: patient.hasElectricity,
      heatingType: patient.heatingType,
      houseType: patient.houseType,
      waterType: patient.waterType
    }
  }

  return (<Form
    fields={fields}
    {...props}
    layout="vertical"
    buttonText={props.btnText
    ? props.btnText
    : "Confirmar"}
    loading={props.loading}
    onBack={props.prevStep}
    defaultValues={values}
    track={["waterType", "houseType", "heatingType"]}/>)
}

export default demographicForm
