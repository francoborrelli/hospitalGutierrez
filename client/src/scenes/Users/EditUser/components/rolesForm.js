import React from "react"

import {Card} from "antd"

import Form from "../../../../containers/Form/Form"

const rolesForm = props => {
  const fields = {
    roles: {
      name: "roles",
      type: "select",
      options: props.roles,
      rules: [{required: true, message: "Debe tener un rol"}],
      props: {
        mode: "multiple",
        placeholder: "Roles"
      }
    }
  }

  return <Card title="Roles">
    <Form
    layout="vertical"
    fields={fields}
    {...props}
    />
  </Card>

}

export default rolesForm
