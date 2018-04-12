import React, { Component } from "react"
import { Menu } from "antd"
import NavLink from "../components/navLink"
import { withRouter } from "react-router-dom"

const { Item } = Menu

class SiderMenu extends Component {

  getNavLinkClass = path => {
    let pathname = this.props.location.pathname
    if (path === "/") {
      return pathname === path ? "ant-menu-item-selected" : ""
    }
    return pathname.startsWith(path) ? "ant-menu-item-selected" : ""
  }

  render() {
    return (
      <Menu theme="light" mode="inline">
        <Item key="home" className={this.getNavLinkClass("/")}>
          <NavLink path="/" icon="home" text="Inicio" />
        </Item>
        <Item key="patients" className={this.getNavLinkClass("/patients")}>
          <NavLink path="/patients" icon="medicine-box" text="Pacientes" />
        </Item>
        <Item key="users" className={this.getNavLinkClass("/users")}>
          <NavLink path="/users" icon="team" text="Usuarios" />
        </Item>
        <Item key="reports" className={this.getNavLinkClass("/reports")}>
          <NavLink path="/reports" icon="pie-chart" text="Reportes" />
        </Item>
        <Item key="settings" className={this.getNavLinkClass("/settings")}>
          <NavLink path="/settings" icon="setting" text="Configuración" />
        </Item>
        <Item key="logout">
          <NavLink path="/logout" icon="logout" text="Cerrar Sesión" />
        </Item>
      </Menu>
    )
  }
}

export default withRouter(SiderMenu)
