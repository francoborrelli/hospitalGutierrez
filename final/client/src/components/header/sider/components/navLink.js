import React from "react"
import { NavLink } from "react-router-dom"
import {Icon} from "antd"


const navLink = props =>
    <NavLink to={props.path} onClick={props.clicked}>
      <Icon type={props.icon} />
      <span className="nav-text">{props.text}</span>
    </NavLink>

export default navLink
