import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import RowGutter from '../../../components/grid/row';

import axios from '../../../axios-api';
import Section from '../../../components/header/sectionHeader/sectionHeader';
import PersonalForm from './components/personalInfoForm';
import RolesForm from './components/rolesForm';
import PasswordForm from './components/passwordForm';
import hasPermission from '../../../hoc/hasPermission';

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

  personalDataHandler = data => {
    this.setState({ personalDataRequest: true });
    //request
    this.setState({ personalDataRequest: false });
    message.success('Datos modificados correctamente');
  };

  passwordHandler = data => {
    this.setState({ passwordRequest: true });
    //request
    this.setState({ passwordRequest: false });
    message.success('Contraseña reestablecida correctamente');
  };

  rolesHandler = data => {
    this.setState({ rolesRequest: true });
    //request
    this.setState({ rolesRequest: false });
    message.success('Roles de usuario modificados correctamente');
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

export default hasPermission(EditUser, ['usuario_index', 'usuario_update']);
