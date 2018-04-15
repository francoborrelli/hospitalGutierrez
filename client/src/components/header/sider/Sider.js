import React from 'react';
import Menu from './containers/SiderMenu';
import logo from '../images/logo.png';
import { Layout } from 'antd';

const { Sider } = Layout;

const sider= props => {
    const width = props.responsive ? 0 : 80
    return (
      <Sider className="sider" trigger={null} collapsible collapsed={props.collapsed}
      breakpoint="md"
      collapsedWidth={width}
      onCollapse={(collapsed, type) => {props.responsiveHandler}}>
        <div className="logonb">
          <img src={logo} alt="banner"/>
        </div>
        <Menu/>
      </Sider>
    );
  }

export default sider;
