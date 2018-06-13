import React from "react"
import Form from "../../../containers/Form/Form"
import moment from "moment"
import axios from '../../../axios-api';

const personalDataForm = props => {

  const documentValidator = (form, rule, documentNumber, callback) => {

    const documentType = form.getFieldValue("documentType")
    const patient = props.patient ? props.patient : {}
    if (documentType && (parseInt(documentType, 10) !== patient.documentType || documentNumber !== patient.documentNumber)) {
      axios
        .get('/patients/documentExists', {
        params: {
          documentNumber: documentNumber,
          documentType: documentType,
          id: patient
            ? patient.id
            : undefined
        }
      })
        .then((response) => {
          if (response.data) {
            callback("El documento ya se encuentra registrado en el sistema")
          } else {
            callback()
          }
        })
    } else {
      callback()
    }
  }

  const revalidate = (form, rule, documentType, callback) => {
    const documentNumber = form.getFieldValue("documentNumber")
    if (documentNumber) {
      form.validateFields(["documentNumber"], {force: true})
    }
    callback()
  }

  const fields = {
    lastName: {
      name: "lastName",
      label: "Apellido",
      type: "input",
      rules: [
        {
          required: true,
          whitespace: true,
          message: "Ingrese el apellido"
        }, {
          message: "Debe tener solo letras",
          pattern: "^[a-zA-ZÀ-ÿ\u00f1\u00d1  _]*(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1" +
              "  _]+$"
        }
      ]
    },
    firstName: {
      name: "firstName",
      label: "Nombre",
      type: "input",
      rules: [
        {
          required: true,
          whitespace: true,
          message: "Ingrese el nombre"
        }, {
          message: "Debe tener solo letras",
          pattern: "^[a-zA-ZÀ-ÿ\u00f1\u00d1  _]*(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1" +
              "  _]+$"
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
          style: {
            width: 70
          },
          placeholder: "Tipo",
          required: true
        },
        customValidator: revalidate,
        options: props.data.documentTypes || []
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
      options: [
        {
          id: "male",
          nombre: "Másculino"
        }, {
          id: "female",
          nombre: "Femenino"
        }
      ],
      rules: [
        {
          required: true,
          message: "Seleccione un género"
        }
      ]
    },
    address: {
      name: "address",
      label: "Dirección",
      type: "input",
      rules: [
        {
          required: true,
          whitespace: true,
          message: "Ingrese la dirección"
        }
      ]
    },
    insurance: {
      name: "insurance",
      label: "Obras Social",
      type: "select",
      props: {
        placeholder: "Obra Social"
      },
      options: props.data.insurances || []
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

  let values;
  const patient = props.patient
  if (patient) {
    values = {
      documentType: patient.documentType
        ? patient
          .documentType
          .toString()
        : undefined,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthday: moment(patient.birthday),
      phone: patient.phone,
      insurance: patient.insurance
        ? patient
          .insurance
          .toString()
        : undefined,
      address: patient.address,
      gender: patient.gender,
      documentNumber: patient.documentNumber
    }
  }

  return (<Form
    fields={fields}
    {...props}
    layout="vertical"
    buttonText={props.btnText
    ? props.btnText
    : "Confirmar"}
    defaultValues={values}
    track={["documentType"]}/>)
}

export default personalDataForm
