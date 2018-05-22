import React, { Component } from "react"
import { message } from "antd"

import Section from '../../components/patientHeader';
import RecordForm from '../components/form';

class AddRecord extends Component {
  state = {
    loading: false,
  }

  submitHandler = data => {
    this.setState({ loading: true })
    //request
    this.setState({ loading: false })
    this.props.history.push("/patients")
    message.success(
      "Se agregó a " + data.name + " " + data.lastname + " correctamente."
    )
  }

  render() {
    return (
      <Section patient={this.props.patient}>
              <RecordForm title="Nuevo Control"/>
      </Section>
    )
  }
}

export default AddRecord
