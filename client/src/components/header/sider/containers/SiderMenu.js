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

  getNavItems = items =>
    items.map((item, index) => (
      <Item key={index} className={this.getNavLinkClass(item.path)}>
        <NavLink
          path={item.path}
          icon={item.icon}
          text={item.text}
        />
      </Item>
    ))

  render() {
    const items = [
      { text: "Inicio", path: "/", icon: "home" },
      {
        text: "Pacientes",
        path: "/patients",
        icon: "medicine-box"
      },
      { text: "Usuarios", path: "/users", icon: "team" },
      { text: "Reportes", path: "/reports", icon: "pie-chart" },
      { text: "Cerrar Sesión", path: "/logout", icon: "logout" }
    ]

    return (
      <Menu theme="light" mode="inline">
        {this.getNavItems(items)}
      </Menu>
    )
  }
}

export default withRouter(SiderMenu)
