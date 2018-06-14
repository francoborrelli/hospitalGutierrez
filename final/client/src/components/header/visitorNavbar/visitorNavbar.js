import React from "react"
import {Layout, Menu, Icon} from "antd"
import logo from "../images/logo.png"
import {Link, NavLink} from "react-router-dom"

const {Header} = Layout
const SubMenu = Menu.SubMenu

const visitorNavbar = props => {
  return (
    <Header className="navbar">
      <div>
        <Link to="/" className="logo" id="logo">
          <img src={logo} alt="Caduceo - Logo del hospital"/>
          Hospital Gutierrez
        </Link>
      </div>
      <div>
        <Menu
          theme="light"
          mode="horizontal"
          style={{
          lineHeight: "63px"
        }}>
          <Menu.Item className="login common">
            <NavLink to="/login">Iniciar Sesión</NavLink>
          </Menu.Item>
          <SubMenu title={< Icon type = "bars" />} className="login responsive">
            <Menu.Item>
              <NavLink to="/login">Iniciar Sesión</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Header>
  )
}

export default visitorNavbar
