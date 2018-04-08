import React from "react"
import { Menu, Icon } from "antd"
import { NavLink } from "react-router-dom"
import { withRouter } from "react-router-dom"
const {Item} = Menu;

class MenuSider extends React.Component {

  getNavLinkClass = path => {
    let pathname = this.props.location.pathname;
    if (path === "/"){
      return pathname === path ? "ant-menu-item-selected" : "";
    }
    return pathname.startsWith(path) ? "ant-menu-item-selected" : "";
  }

  render() {
    return (
      <Menu theme="light" mode="inline">
        <Item key="home" className={this.getNavLinkClass("/")}>
          <NavLink to="/">
            <Icon type="home" />
            <span className="nav-text"> Inicio</span>
          </NavLink>
        </Item>
        <Item key="patients" className={this.getNavLinkClass("/patients")}>
          <NavLink to="/patients">
            <Icon type="medicine-box" />
            <span className="nav-text"> Pacientes</span>
          </NavLink>
        </Item>
        <Item key="users" className={this.getNavLinkClass("/users")}>
          <NavLink to="/users">
            <Icon type="team" />
            <span className="nav-text"> Usuarios</span>
          </NavLink>
        </Item>
        <Item key="reports" className={this.getNavLinkClass("/reports")}>
          <NavLink to="/reports">
            <Icon type="pie-chart"/>
            <span className="nav-text"> Reportes</span>
          </NavLink>
        </Item>
        <Item key="settings" className={this.getNavLinkClass("/settings")}>
          <NavLink to="/settings">
            <Icon type="setting" />
            <span className="nav-text"> Configuración</span>
          </NavLink>
        </Item>
        <Item key="5">
          <NavLink to="/logout">
            <Icon type="logout" />
            <span className="nav-text"> Cerrar Sesión</span>
          </NavLink>
        </Item>
      </Menu>
    )
  }
}

export default withRouter(MenuSider)
