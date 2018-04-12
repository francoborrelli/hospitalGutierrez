import React from 'react';
import { Layout } from 'antd';
import logo from '../images/logo.png';
import Menu from './containers/SiderMenu';

const { Header, Content, Footer, Sider } = Layout;


const loggedSider = (props) =>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{backgroundColor: "white"}}
      >
        <div className="logonb">
          <img src={logo} alt="banner"/>
        </div>
      <Menu/>
    </Sider>


export default loggedSider;
