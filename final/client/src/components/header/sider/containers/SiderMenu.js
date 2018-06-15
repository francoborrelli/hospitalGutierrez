import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';
import NavLink from '../components/navLink';

const { Item } = Menu;

const siderMenu = props => {
  const getNavLinkClass = path => {
    let pathname = props.location.pathname;
    if (path === '/') {
      return pathname === path ? 'ant-menu-item-selected' : '';
    }
    return pathname.startsWith(path) ? 'ant-menu-item-selected' : '';
  };

  const clickHandler = () => {
    if (props.action) {
      props.clicked();
    }
  };

  const getNavItems = items =>
    items.map(
      (item, index) =>
        !item.permission || props.permissions.includes(item.permission) ? (
          <Item key={index} className={getNavLinkClass(item.path)}>
            <NavLink
              path={item.path}
              icon={item.icon}
              text={item.text}
              clicked={clickHandler}
            />
          </Item>
        ) : null
    );

  const items = [
    {
      text: 'Inicio',
      path: '/',
      icon: 'home'
    },
    {
      text: 'Usuarios',
      path: '/users',
      icon: 'team',
      permission: 'usuario_index'
    },
    {
      text: 'Pacientes',
      path: '/patients',
      icon: 'medicine-box',
      permission: 'paciente_index'
    },
    {
      text: 'Reportes',
      path: '/reports',
      icon: 'pie-chart',
      permission: 'reportes_index'
    },
    {
      text: 'Configuración',
      path: '/settings',
      icon: 'setting',
      permission: 'config_update'
    }
  ];

  return (
    <Menu theme="light" mode="inline">
      {getNavItems(items)}
      <Item className="logout">
        <NavLink
          path="/"
          icon="logout"
          text="Cerrar sesión"
          clicked={props.logout}
        />
      </Item>
    </Menu>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

const mapStateToProps = state => ({ permissions: state.auth.user.permissions });

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(siderMenu)
);
