import React from "react"
import { Icon } from "react-fa"
import { Tooltip } from "antd"

const footerItem = props => (
  <li>
    <Tooltip placement="left" title={props.title}>
      <Icon name={props.icon} />
    </Tooltip>
  </li>
)

export default footerItem
