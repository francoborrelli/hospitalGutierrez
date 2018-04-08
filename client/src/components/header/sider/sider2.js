import React from 'react';
import Menu from './components/menu';
import logo from '../images/logo.png';
import { Layout } from 'antd';

const { Sider } = Layout;

const sider= props => {
    return (
      <Sider className="sider" trigger={null} collapsible collapsed={props.collapsed} >
        <div className="logonb">
          <img src={logo} alt="banner"/>
        </div>
        <Menu/>
      </Sider>
    );
  }

export default sider;
