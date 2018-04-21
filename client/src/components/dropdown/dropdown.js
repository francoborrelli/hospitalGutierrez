import React from "react"
import { Dropdown, Icon } from "antd"

const dropdown = props => (
  <Dropdown overlay={props.menu} trigger={["click"]} placement="bottomRight">
    <a className="ant-dropdown-link">
      {props.title || "Acciones"} <Icon type="down" />
    </a>
  </Dropdown>
)

export default dropdown
