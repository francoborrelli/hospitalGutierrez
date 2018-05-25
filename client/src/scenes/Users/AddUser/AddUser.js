import React, {Component} from "react"
import {Card, message} from "antd"

import Section from "../../../components/header/sectionHeader/sectionHeader"
import PersonalForm from "./components/form"

class AddUser extends Component {
  state = {
    loading: false,
    roles: [
      {
        id: 0,
        nombre: "Administrador"
      }, {
        id: 1,
        nombre: "Pediatra"
      }, {
        id: 2,
        nombre: "Recepcionista"
      }
    ]
  }

  redirect = () => {
    this
      .props
      .history
      .push("/users")
  }

  addHandler = data => {
    this.setState({loading: true})

    //request

    this.setState({loading: false})
    this.redirect()
    message.success("Se agregó a " + data.name + " " + data.lastname + " correctamente.")
  }
  render = () => (
    <Section title="Agregar Usuario" goBackTo="/users">
      <div style={{
        margin: "0 10px"
      }}>
        <Card
          style={{
          margin: "10px auto",
          maxWidth: 850
        }}>
          <div
            style={{
            maxWidth: 700,
            margin: "0 auto"
          }}>
            <PersonalForm
              onCancel={this.redirect}
              roles={this.state.roles}
              submitted={this.addHandler}
              loading={this.state.loading}/>
          </div>
        </Card>
      </div>

    </Section>
  )
}

export default AddUser
