import React, {Component} from 'react';
import {Col, message} from 'antd';
import Row from '../../../components/grid/row';
import Section from '../../../components/header/sectionHeader/sectionHeader';
import SearchForm from './components/searchForm';
import Table from './components/table';
import hasPermission from '../../../hoc/hasPermission';
import axios from '../../../axios-api';

class UserList extends Component {
  state = {
    loading: true,
    searching: false,
    allUsers: [],
    filtered: false,
    users: []
  };

  componentDidMount = async() => {
    try {
      const response = await axios.get('/users');
      this.setState({loading: false, users: response.data, allUsers: response.data});
    } catch (error) {
      message.error('Ocurrió un error al obtener los usuarios');
    }
  };

  searchHandler = data => {
    this.setState({searching: true});
    let users = this.state.allUsers
    if (data.username) {
      users = users.filter(user => user.username.toLowerCase().includes(data.username.toLowerCase()))
    }
    if (data.state) {
      if (data.state === "active") {
        users = users.filter(user => user.active)
      } else {
        users = users.filter(user => !user.active)
      }
    }
    const filtered = users === this.state.allUsers
    this.setState({searching: false, users: users, filtered: filtered});
  };

  resetHandler = () => {
    this.setState(prevState => ({users: prevState.allUsers}))
  }

  deleteUserHandler = async user => {
    this.setState({loading: true});
    try {
      await axios.patch(`/users/${user.key}`, {active: false});
      const name = user.name + ' ' + user.lastname;
      message.success('Se eliminó a ' + name + ' correctamente.');
      this.setState(prevState => {
        const newUsers = [];
        prevState
          .users
          .forEach(u => {
            if (u._id === user.key) {
              newUsers.push({
                ...u,
                active: false
              });
            } else {
              newUsers.push(u);
            }
          });
        return {users: newUsers, loading: false};
      });
    } catch (error) {
      message.error('Algo falló. Intentá nuevamente.');
      this.setState({loading: false});
    }
  };

  render() {
    return (
      <Section title="usuarios">
        <Row>
          <Col xl={5} lg={7}>
            <SearchForm
              goBlank={this.resetHandler}
              loading={this.state.searching}
              documentTypes={this.state.documentTypes}
              submitted={this.searchHandler}/>
          </Col>
          <Col xl={19} lg={17}>
            <Table
              loading={this.state.loading}
              permissions={this.props.user.permissions}
              onDelete={this.deleteUserHandler}
              data={this.state.users}
              user={this.props.user}
              addPath={this
              .props
              .user
              .permissions
              .includes('usuario_new')
              ? '/users/add'
              : null}/>
          </Col>
        </Row>
      </Section>
    );
  }
}

export default hasPermission(UserList, ['usuario_index']);
