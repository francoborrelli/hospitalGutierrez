import React from "react"
import Menu from "./containers/SiderMenu"
import logo from "../images/logo.png"
import { Layout } from "antd"

const { Sider } = Layout

const sider = props => {
  const width = props.responsive ? 0 : 80
  return (
    <Sider
      className="sider"
      style={{ zIndex: 1 }}
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      breakpoint="md"
      collapsedWidth={width}
    >
      <div className="logonb">
        <img src={logo} alt="banner" />
      </div>
      <Menu
        action={!props.collapsed && props.responsive}
        clicked={props.clicked}
      />
    </Sider>
  )
}

export default sider