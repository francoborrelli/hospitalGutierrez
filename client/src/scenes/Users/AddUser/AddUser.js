import React, { Component } from 'react';
import { Card, message } from 'antd';

import axios from '../../../axios-api';
import Section from '../../../components/header/sectionHeader/sectionHeader';
import PersonalForm from './components/form';
import hasPermission from '../../../hoc/hasPermission';

class AddUser extends Component {
  state = {
    loading: false,
    roles: []
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/roles');
      this.setState({
        roles: response.data.map(role => ({ id: role._id, nombre: role.name }))
      });
    } catch (error) {
      message.error('Ocurrió un error');
    }
  }

  redirect = () => {
    this.props.history.push('/users');
  };

  addHandler = async data => {
    this.setState({ loading: true });
    try {
      console.log(data);
      const response = await axios.post('users', {
        username: data.username,
        firstName: data.name,
        lastName: data.lastname,
        email: data.email,
        roles: data.roles,
        password: data.password
      });
      this.setState({ loading: false });
      message.success(
        'Se agregó a ' + data.name + ' ' + data.lastname + ' correctamente.'
      );
      this.redirect();
    } catch (error) {
      console.log(error.response);
      this.setState({ loading: false });
      message.success('Ocurrió un error');
    }
  };

  render() {
    return (
      <Section title="Agregar Usuario" goBackTo="/users">
        <div
          style={{
            margin: '0 10px'
          }}
        >
          <Card
            style={{
              margin: '10px auto',
              maxWidth: 850
            }}
          >
            <div
              style={{
                maxWidth: 700,
                margin: '0 auto'
              }}
            >
              <PersonalForm
                onCancel={this.redirect}
                roles={this.state.roles}
                submitted={this.addHandler}
                loading={this.state.loading}
              />
            </div>
          </Card>
        </div>
      </Section>
    );
  }
}

export default hasPermission(AddUser, ["usuario_index", "usuario_new"]);
