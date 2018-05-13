import React from "react"
import {Card} from "antd"
import Icon from "../../../components/icon/icon"
import Form from "../../../containers/Form/Form"

//Mock data
const data = {
  title: "Hospital Gutierrez",
  email: "hospital@gmail.com",
  description: "Esto es un hospital"
}

const titleIcon = <Icon type="flag" />
const emailIcon = <Icon type="mail" />
const descriptionIcon = <Icon type="idcard" />

const fields = {
  title: {
    name: "title",
    type: "input",
    rules: [
      { required: true, message: "Ingrese el título", whitespace: true },
      { max: 40, message: "No debe tener más de 40 caracteres" }
    ],
    props: {
      placeholder: "Título",
      prefix: titleIcon
    }
  },
  email: {
    name: "email",
    type: "input",
    rules: [
      { required: true, message: "Ingrese el email", whitespace: true },
      { type: "email", message: "Email inválido" }
    ],
    props: {
      placeholder: "Email",
      prefix: emailIcon
    }
  },
  description: {
    name: "description",
    type: "input",
    rules: [
      { required: true, message: "Ingrese la descripción", whitespace: true }
    ],
    props: {
      placeholder: "Descripción del sitio",
      prefix: descriptionIcon
    }
  }
}

const pageConfiguration = props => (
  <Card title="Datos del Sitio">
    <Form
      className="ant-advanced-search-form"
      fields={fields}
      values={data}
      style={{padding: "0px 20px"}}
      buttonText="Guardar"
    />
  </Card>
)

export default pageConfiguration
