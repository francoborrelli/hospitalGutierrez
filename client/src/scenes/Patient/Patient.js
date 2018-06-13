import React, { Component } from 'react';
import { message } from 'antd';
import { Route, Switch, withRouter } from 'react-router-dom';
import Section from './components/patientHeader';
import ProfilePage from './Profile/Profile';
import AddRecordPage from './ClinicHistory/AddRecord/AddRecord';
import EditPatientPage from '../Patients/EditPatient/EditPatient';
import RecordPage from './ClinicHistory/Record';
import hasPermission from '../../hoc/hasPermission';
import Error403 from '../Errors/403';
import Error404 from '../Errors/404';
import axiosApi from '../../axios-api.js';
import axiosRef from '../../axios-apiReferences';

class PatientPage extends Component {
  state = {
    error: false,
    personalDataRequest: false,
    demographicDataRequest: false,
    loadingPage: true,
    deleteRequest: false,
    patient: {}
  };

  componentDidMount = () => {
    axiosApi
      .get('patients/' + this.props.match.params.patientId)
      .then(response => {
        this.setState({ patient: response.data });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const patient = this.state.patient;
    if (prevState.patient !== patient && patient.houseType) {
      if (
        patient.insurance &&
        prevState.patient.insurance !== patient.insurance
      ) {
        axiosRef.get('/obra-social/' + patient.insurance).then(result => {
          this.setState(prevState => ({
            patient: {
              ...prevState.patient,
              insuranceName: result.data.nombre
            }
          }));
        });
      }
      if (prevState.patient.documentType !== patient.documentType) {
        axiosRef.get('/tipo-documento/' + patient.documentType).then(result => {
          this.setState(prevState => ({
            patient: {
              ...prevState.patient,
              documentName: result.data.nombre
            }
          }));
        });
      }
      if (prevState.patient.houseType !== patient.houseType) {
        axiosRef.get('/tipo-vivienda/' + patient.houseType).then(result => {
          this.setState(prevState => ({
            patient: {
              ...prevState.patient,
              houseName: result.data.nombre
            }
          }));
        });
      }
      if (prevState.patient.waterType !== patient.waterType) {
        axiosRef
          .get('/tipo-agua/' + this.state.patient.waterType)
          .then(result => {
            this.setState(prevState => ({
              patient: {
                ...prevState.patient,
                waterName: result.data.nombre
              }
            }));
          });
      }
      if (prevState.patient.heatingType !== patient.heatingType) {
        axiosRef
          .get('/tipo-calefaccion/' + patient.heatingType)
          .then(result => {
            this.setState(prevState => ({
              patient: {
                ...prevState.patient,
                heatingName: result.data.nombre
              }
            }));
          });
      }
    }
    this.checkLoading();
  };

  checkLoading = () => {
    const patient = this.state.patient;
    if (this.state.loadingPage) {
      if (
        patient.documentName &&
        patient.houseName &&
        patient.waterName &&
        patient.heatingName
      ) {
        return this.setState({ loadingPage: false });
      }
    }
  };

  editPersonalDataHandler = data => {
    this.setState({ personalDataRequest: true });
    axiosApi
      .patch('patients/' + this.props.match.params.patientId, data)
      .then(response => {
        this.setState(prevState => ({
          patient: {
            ...prevState.patient,
            ...response.data
          },
          personalDataRequest: false
        }));
        message.success(
          'Los datos del paciente se actualizaron correctamente.'
        );
      })
      .catch(() => {
        this.setState({ personalDataRequest: false });
        message.error('Ha ocurrido un error. Intenta nuevamente.');
      });
  };

  editDemographicDataHandler = data => {
    const result = {
      ...data,
      hasPet: data.hasPet === 1,
      hasRefrigerator: data.hasRefrigerator === 1,
      hasElectricity: data.hasElectricity === 1
    };
    this.setState({ demographicDataRequest: true });
    axiosApi
      .patch(
        'patients/' + this.props.match.params.patientId + '/demographicData',
        result
      )
      .then(response => {
        this.setState(prevState => ({
          patient: {
            ...prevState.patient,
            ...response.data
          },
          demographicDataRequest: false
        }));
        message.success(
          'Los datos demográficos del paciente se actualizaron correctamente.'
        );
      })
      .catch(() => {
        this.setState({ demographicDataRequest: false });
        message.error('Ha ocurrido un error. Intenta nuevamente.');
      });
  };

  deletePatientHandler = patient => {
    this.setState({ deleteRequest: true });

    if (this.state.patient.clinicalRecords.length !== 0) {
      message.error('No se puede eliminar con paciente que tenga controles');
      return;
    }

    return axiosApi
      .delete('patients/' + this.props.match.params.patientId)
      .then(() => {
        const name = patient.firstName + ' ' + patient.lastName;
        message.success('Se eliminó a ' + name + ' correctamente.');
        this.setState({ loading: false });
        this.props.history.push('/patients');
      })
      .catch(() => message.error('Algo falló. Intentá nuevamente.'));
  };

  setRecords = () => {
    this.setState({ deleteRequest: true });
    axiosApi
      .get('patients/' + this.props.match.params.patientId)
      .then(response => {
        this.setState(prevState => ({
          patient: {
            ...prevState.patient,
            clinicalRecords: response.data.clinicalRecords
          }
        }));
      })
      .catch(() => {
        this.setState({ error: true, deleteRequest: false });
      });
  };

  deleteRecordHandler = record => {
    const url =
      'patients/' +
      this.props.match.params.patientId +
      '/clinicalRecords/' +
      record.key;
    return axiosApi
      .delete(url)
      .then(() => {
        const records = this.state.patient.clinicalRecords.filter(r => {
          return r._id !== record.key;
        });
        this.setState(prevState => ({
          patient: { ...prevState.patient, clinicalRecords: records }
        }));
        message.success('Control eliminado exitosamente');
      })
      .catch(() => {
        message.error('Ocurrio un error. Intenta nuevamente');
      });
  };

  checkPermissions = () => {
    const url = this.props.location.pathname;
    switch (true) {
      case url === this.props.match.url + '/edit':
        return (
          this.props.user.permissions.includes('paciente_update') ||
          this.props.user.permissions.includes('datosDemograficos_update')
        );
      case url === this.props.match.url + '/addRecord':
        return this.props.user.permissions.includes('control_new');
      case url.includes(this.props.match.url + '/record'):
        return this.props.user.permissions.includes('control_show');
      default:
        return true;
    }
  };

  render() {
    let section = (
      <Section patient={this.state.patient}>
        <Switch>
          <Route
            path={this.props.match.url + '/edit'}
            exact
            render={() => (
              <EditPatientPage
                patient={this.state.patient}
                user={this.props.user}
                personalDataSumitted={this.editPersonalDataHandler}
                demographicDataSumitted={this.editDemographicDataHandler}
                loadingPage={this.state.loadingPage}
                loadingPersonal={this.state.personalDataRequest}
                loadingDemographic={this.state.demographicDataRequest}
              />
            )}
          />
          <Route
            path={this.props.match.url + '/addRecord'}
            exact
            render={() => (
              <AddRecordPage
                user={this.props.user}
                patient={this.state.patient}
                reload={this.setRecords}
                loading={this.state.deleteRequest}
              />
            )}
          />
          <Route
            path={this.props.match.url + '/record/:recordId'}
            render={() => (
              <RecordPage
                user={this.props.user}
                onDeleteRecord={this.deleteRecordHandler}
                patient={this.state.patient}
              />
            )}
          />
          <Route
            path={this.props.match.url}
            exact
            render={() => (
              <ProfilePage
                patient={this.state.patient}
                user={this.props.user}
                loadingPage={this.state.loadingPage}
                onDeleteRecord={this.deleteRecordHandler}
                onDeletePatient={this.deletePatientHandler}
              />
            )}
          />
        </Switch>
      </Section>
    );

    section = this.state.error ? <Error404 /> : section;

    return this.checkPermissions() ? section : <Error403 />;
  }
}

export default withRouter(hasPermission(PatientPage, ['paciente_show']));
