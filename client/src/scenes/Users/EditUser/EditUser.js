import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import RowGutter from '../../../components/grid/row';

import axios from '../../../axios-api';
import Section from '../../../components/header/sectionHeader/sectionHeader';
import PersonalForm from './components/personalInfoForm';
import RolesForm from './components/rolesForm';
import PasswordForm from './components/passwordForm';
import hasPermission from '../../../hoc/hasPermission';
import { withRouter } from 'react-router-dom';

class EditUser extends Component {
  state = {
    personalDataRequest: false,
    passwordRequest: false,
    rolesRequest: false,

    personalData: {
      name: '',
      lastname: '',
      username: '',
      email: ''
    },
    personalRoles: {
      roles: []
    },
    roles: []
  };

  componentDidMount = async () => {
    try {
      const userResponse = await axios.get(
        `/users/${this.props.match.params.userId}`
      );
      const roleResponse = await axios.get('/roles');
      const roles = roleResponse.data;
      const user = userResponse.data;
      this.setState({
        personalData: {
          name: user.firstName,
          lastname: user.lastName,
          username: user.username,
          email: user.email
        },
        personalRoles: {
          roles: user.roles.map(role => role._id)
        },
        roles: roles.map(role => ({
          id: role._id,
          nombre: role.name
        }))
      });
    } catch (error) {
      message.error('Ocurrió un error');
    }
  };

  personalDataHandler = async data => {
    this.setState({ personalDataRequest: true });
    try {
      const response = await axios.patch(
        `/users/${this.props.match.params.userId}`,
        {
          email: data.email,
          lastName: data.lastname,
          firstName: data.name,
          username: data.username
        }
      );
      const user = response.data;
      this.setState({
        personalDataRequest: false,
        personalData: {
          name: user.firstName,
          lastname: user.lastName,
          username: user.username,
          email: user.email
        }
      });
      message.success('Datos modificados correctamente');
    } catch (error) {
      this.setState({ personalDataRequest: false });
      message.error('Ocurrió un error al actualizar los datos del usuario');
    }
  };

  passwordHandler = async data => {
    this.setState({ passwordRequest: true });
    console.log(data);
    try {
      await axios.patch(`/users/${this.props.match.params.userId}`, {
        password: data.password
      });
      message.success('Contraseña reestablecida correctamente');
    } catch (error) {
      message.error('Ocurrió un error al actualizar la contraseña');
    }
    this.setState({ passwordRequest: false });
  };

  rolesHandler = async data => {
    this.setState({ rolesRequest: true });
    try {
      const response = await axios.patch(
        `/users/${this.props.match.params.userId}`,
        { roles: data.roles }
      );
      this.setState({
        rolesRequest: false,
        personalRoles: response.data.roles
      });
      message.success('Roles de usuario modificados correctamente');
    } catch (error) {
      message.error('Ocurrió un error al actualizar los roles del usuario');
      this.setState({ rolesRequest: false });
    }
  };

  render = () => {
    return (
      <Section title="Editar Usuario" goBackTo={'/users'}>
        <RowGutter>
          <Col
            xs={24}
            xl={14}
            style={{
              marginBottom: 10
            }}
          >
            <PersonalForm
              submitted={this.personalDataHandler}
              loading={this.state.personalDataRequest}
              defaultValues={this.state.personalData}
            />
          </Col>
          <Col xs={24} xl={10}>
            <Row gutter={10}>
              <Col
                md={12}
                xl={24}
                style={{
                  marginBottom: 10
                }}
              >
                <PasswordForm
                  submitted={this.passwordHandler}
                  loading={this.state.passwordRequest}
                />
              </Col>
              <Col md={12} xl={24}>
                <RolesForm
                  submitted={this.rolesHandler}
                  loading={this.state.rolesRequest}
                  defaultValues={this.state.personalRoles}
                  roles={this.state.roles}
                />
              </Col>
            </Row>
          </Col>
        </RowGutter>
      </Section>
    );
  };
}

export default withRouter(
  hasPermission(EditUser, ['usuario_index', 'usuario_update'])
);
