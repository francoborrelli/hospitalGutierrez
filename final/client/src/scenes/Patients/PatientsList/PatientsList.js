import React, { Component } from 'react';
import { Col, message } from 'antd';
import { withRouter } from 'react-router-dom';
import Row from '../../../components/grid/row';
import Section from '../../../components/header/sectionHeader/sectionHeader';
import SearchForm from './components/searchForm';
import Table from './components/table';
import hasPermission from '../../../hoc/hasPermission';
import axiosRef from '../../../axios-apiReferences';
import axiosApi from '../../../axios-api';

class PatientsList extends Component {
  state = {
    loading: true,
    searching: false,
    filtered: false,
    documentTypes: [],
    patients: []
  };

  componentDidMount = () => {
    axiosRef.get('tipo-documento').then(response => {
      this.setState({ documentTypes: response.data });
    });
    axiosApi.get('/patients').then(response => {
      this.setState({
        loading: false,
        allPatients: response.data,
        patients: response.data
      });
    });
  };

  searchHandler = data => {
    this.setState({ searching: true });
    let patients = this.state.allPatients;

    if (data.name) {
      patients = patients.filter(patient =>
        patient.firstName.toLowerCase().includes(data.name.toLowerCase())
      );
    }
    if (data.lastname) {
      patients = patients.filter(patient =>
        patient.lastName.toLowerCase().includes(data.lastname.toLowerCase())
      );
    }
    if (data.documentNumber) {
      patients = patients.filter(patient =>
        patient.documentNumber
          .toLowerCase()
          .includes(data.documentNumber.toLowerCase())
      );
    }
    if (data.documentType) {
      patients = patients.filter(
        patient => patient.documentType.toString() === data.documentType
      );
    }

    let filtered = this.state.allPatients.length !== patients.length;
    this.setState({ searching: false, patients: patients, filtered: filtered });
  };

  resetHandler = () => {
    this.setState(prevState => ({
      patients: prevState.allPatients,
      filtered: false
    }));
  };

  deletePatientHandler = patient => {
    this.setState({ loading: true });

    const p = this.state.allPatients.filter(p => p._id === patient.key)[0];
    if (p.clinicalRecords.length > 0) {
      message.error(
        'No se puede eliminar a un paciente que tenga controles registrados'
      );
      this.setState({ loading: false });
      return;
    }

    axiosApi
      .delete('/patients/' + patient.key)
      .then(() => {
        const allPatients = this.state.allPatients.filter(
          p => p._id !== patient.key
        );
        const patients = this.state.patients.filter(p => p._id !== patient.key);
        this.setState({
          allPatients: allPatients,
          patients: patients,
          loading: false
        });
        const name = patient.firstName + ' ' + patient.lastName;
        message.success('Se eliminó a ' + name + ' correctamente.');
      })
      .catch(() => message.error('Algo falló. Intentá nuevamente.'));
  };

  render() {
    return (
      <Section title="pacientes">
        <Row>
          <Col
            xl={6}
            style={{
              paddingBottom: 10
            }}
          >
            <SearchForm
              mantainDefault
              goBlank={this.state.filtered ? this.resetHandler : null}
              loading={this.state.searching}
              documentTypes={this.state.documentTypes}
              submitted={this.searchHandler}
            />
          </Col>
          <Col xl={18}>
            <Table
              loading={this.state.loading}
              data={this.state.patients}
              user={this.props.user}
              onDelete={this.deletePatientHandler}
              documentTypes={this.state.documentTypes}
              addPath={'/patients/add'}
            />
          </Col>
        </Row>
      </Section>
    );
  }
}

export default withRouter(hasPermission(PatientsList, ['paciente_index']));
