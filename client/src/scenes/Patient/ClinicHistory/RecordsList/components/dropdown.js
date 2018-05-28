import React from "react"
import {Menu} from "antd"
import Dropdown from "../../../../../components/dropdown/dropdown"
import {deleteModal as Modal} from "../../../../../components/modal/modal"
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const Item = Menu.Item
const Divider = Menu.Divider

const dropdown = props => {
  const show = props
    .user
    .permissions
    .includes('control_show')
    ? (
      <Item key="0">
        <Link to={props.match.path + "/record/" + props.record.key}>
          Ver
        </Link>
      </Item>
    )
    : null

  const update = props
    .user
    .permissions
    .includes('control_update')
    ? (
      <Item key="1">
        <Link to={props.match.path + "/record/" + props.record.key + "/edit"}>
          Editar
        </Link>
      </Item>
    )
    : null

  const destroy = props
    .user
    .permissions
    .includes('control_destroy')
    ? (
      <Item key="2">
        <a
          onClick={() => Modal("control del día " + props.record.date + " de", props.patient, () => props.onOk(props.record))}>
          Eliminar
        </a>
      </Item>
    )
    : null

  const menu = (
    <Menu>
      {show}
      {show && (update || destroy) ? <Divider/> : null}
      {update}
      {destroy && update ? <Divider/> : null}
      {destroy}
    </Menu>
  )

  return (<Dropdown menu={menu}/>)
}

export default withRouter(dropdown)
