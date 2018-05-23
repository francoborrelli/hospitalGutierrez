import React, { Component } from "react"
import { Card, message } from "antd"

import Section from "../../../components/header/sectionHeader/sectionHeader"
import PersonalForm from "./components/form"

class AddUser extends Component {
  state = {
    loading: false,
    roles: [
      { id: 0, nombre: "Administrador" },
      { id: 1, nombre: "Pediatra" },
      { id: 2, nombre: "Recepcionista" }
    ]
  }

  redirect = () => {
    this.props.history.push("/users")
  }

  addHandler = data => {
    this.setState({ loading: true })

    //request

    this.setState({ loading: false })
    this.redirect()
    message.success(
      "Se agregó a " + data.name + " " + data.lastname + " correctamente."
    )
  }
  render = () => (
    <Section title="Agregar Usuario">
      <Card style={{ margin: "24px" }}>
        <div style={{maxWidth: 700, margin: "0 auto"}}>
          <PersonalForm
            onCancel={this.redirect}
            roles={this.state.roles}
            submitted={this.addHandler}
            loading={this.state.loading}
          />
        </div>
      </Card>
    </Section>
  )
}

export default AddUser
