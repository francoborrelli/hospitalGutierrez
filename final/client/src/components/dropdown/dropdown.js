import React from "react"
import { Dropdown, Icon } from "antd"

const dropdown = props => (
  <Dropdown role="menu" overlay={props.menu} trigger={["click"]} placement="bottomRight">
    <a className="ant-dropdown-link">
      {props.title || "Acciones"} <Icon type="down" />
    </a>
  </Dropdown>
)

const dropdownCard = props => (
  <Dropdown role="menu" overlay={props.menu} trigger={["click"]} placement="bottomRight">
    <span style={{cursor: "pointer"}}>
      ...
    </span>
  </Dropdown>
)

export default dropdown
export {dropdownCard}
