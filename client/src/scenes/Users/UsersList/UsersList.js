import React, { Component } from "react"
import {Col, message } from "antd"
import Row from '../../../components/grid/row';
import Section from "../../../components/header/sectionHeader/sectionHeader"
import SearchForm from "./components/searchForm"
import Table from "./components/table"


class UserList extends Component {
  state = {
    loading: true,
    searching: false,
    data: []
  }

  componentDidMount = () => {
    //Get table data

    this.setState({ loading: false })
  }

  searchHandler = data => {
    this.setState({ searching: true })

    //Search request

    this.setState({ searching: false })
  }

  deleteUserHandler = user => {
    return new Promise((resolve, reject) => {
      //Change Timeout for delelte request
      setTimeout(Math.random() > 0.3 ? resolve : reject, 1000)
    })
      .then(() => {
        this.setState({ loading: true })
        const name = user.name + " " + user.lastname
        message.success("Se eliminó a " + name + " correctamente.")
        this.setState({ loading: false })
      })
      .catch(() => message.error("Algo falló. Intentá nuevamente."))
  }

  render() {
    return (
      <Section title="usuarios">
        <Row>
          <Col xl={7}>
              <SearchForm
                loading={this.state.searching}
                documentTypes={this.state.documentTypes}
                submitted={this.searchHandler}
              />
          </Col>
          <Col xl={17}>
              <Table
                loading={this.state.loading}
                onDelete={this.deleteUserHandler}
                addPath="/users/add"
              />
          </Col>
        </Row>
      </Section>
    )
  }
}

export default UserList
