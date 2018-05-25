import React from "react"
import {Menu} from "antd"
import {dropdownCard as Dropdown} from "../../../../../components/dropdown/dropdown"
import {deleteModal as Modal} from "../../../../../components/modal/modal"
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const Item = Menu.Item
const Divider = Menu.Divider

const dropdown = props => {
  const url = props
    .location
    .pathname
    .substring(0, props.location.pathname.lastIndexOf("/"))
  const menu = (
    <Menu>
      <Item key="0">
        <Link to={url.substring(0, url.lastIndexOf("/"))}>
          Volver
        </Link>
      </Item>
      <Divider/>
      <Item key="1">
        <Link to={props.location.pathname + "/edit"}>
          Editar
        </Link>
      </Item>
      <Divider/>
      <Item key="2">
        Eliminar
      </Item>
    </Menu>
  )

  return (<Dropdown menu={menu}/>)
}

export default withRouter(dropdown)
