import React from 'react';
import {Menu} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../../../store/actions';
import NavLink from '../components/navLink';

const {Item} = Menu;

const siderMenu = props => {
  const getNavLinkClass = path => {
    let pathname = props.location.pathname;
    if (path === '/') {
      return pathname === path
        ? 'ant-menu-item-selected'
        : '';
    }
    return pathname.startsWith(path)
      ? 'ant-menu-item-selected'
      : '';
  };

  const clickHandler = () => {
    if (props.action) {
      props.clicked();
    }
  };

  const getNavItems = items => items.map((item, index) => (
    <Item key={index} className={getNavLinkClass(item.path)}>
      <NavLink
        path={item.path}
        icon={item.icon}
        text={item.text}
        clicked={clickHandler}/>
    </Item>
  ));

  const items = [
    {
      text: 'Inicio',
      path: '/',
      icon: 'home'
    }, {
      text: 'Pacientes',
      path: '/patients',
      icon: 'medicine-box'
    }, {
      text: 'Usuarios',
      path: '/users',
      icon: 'team'
    }, {
      text: 'Reportes',
      path: '/reports',
      icon: 'pie-chart'
    }, {
      text: 'Configuración',
      path: '/settings',
      icon: 'setting'
    }
  ];

  return (
    <Menu theme="light" mode="inline">
      {getNavItems(items)}
      <Item className="logout">
        <NavLink path="/" icon="logout" text="Cerrar sesión" clicked={props.logout}/>
      </Item>
    </Menu>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

export default withRouter(connect(null, mapDispatchToProps)(siderMenu));
