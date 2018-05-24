import React, { Component } from "react"
import { message } from "antd"
import RecordForm from '../components/form';
import { withRouter } from 'react-router-dom';

class AddRecord extends Component {
  state = {
    loading: false,
  }

  redirect = () => {
    this.props.history.push(".")
  }

  submitHandler = data => {

    this.setState({ loading: true })
    //request
    this.setState({ loading: false })
    this.redirect()
    message.success(
      "Se agregó a " + data.name + " " + data.lastname + " correctamente."
    )
  }

  render() {
    return (
      <RecordForm
      onCancel={this.redirect}
      submitted={this.submitHandler}
      loading={this.state.loading}
      title="Nuevo Control"/>
    )
  }
}

export default withRouter(AddRecord)
