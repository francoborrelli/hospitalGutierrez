import React from 'react';
import { Layout, Icon } from 'antd';
import Menu from './components/menu/menu'

const { Header } = Layout;

const loggedNavbar = (props) => {
    return (
      <Header className="navbar">
        <Icon
        className="trigger"
        type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={props.clicked}
        />
        <div className="username">
           <Menu/>
        </div>
      </Header>
    );
  }

export default loggedNavbar;
