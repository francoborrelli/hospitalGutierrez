import React, { Component } from "react"
import { Card, message } from "antd"

import Section from "../../../components/header/sectionHeader/sectionHeader"
import PersonalForm from "./components/form"

class AddUser extends Component {
  state = {
    loading: false,
    current: 0,
    roles: [
      { id: 0, nombre: "Administrador" },
      { id: 1, nombre: "Pediatra" },
      { id: 2, nombre: "Recepcionista" }
    ]
  }

  addHandler = data => {
    this.setState({ loading: true })

    //request

    this.setState({ loading: false })
    this.props.history.push("/users")
    message.success(
      "Se agregó a " + data.name + " " + data.lastname + " correctamente."
    )
  }
  render = () => (
    <Section title="Agregar Usuario">
      <Card style={{ margin: "24px" }}>
        <div style={{maxWidth: 700, margin: "0 auto"}}>
          <PersonalForm
            roles={this.state.roles}
            submitted={this.addHandler}
          />
        </div>
      </Card>
    </Section>
  )
}

export default AddUser
