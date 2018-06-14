import React from "react"
import {Menu} from "antd"
import Dropdown from "../../../../components/dropdown/dropdown"
import {deleteModal as Modal} from "../../../../components/modal/modal"
import {Link} from 'react-router-dom';

const Item = Menu.Item
const Divider = Menu.Divider

const dropdown = props => {

  const show = props
    .user
    .permissions
    .includes('paciente_show')
    ? <Item key="0">
        <Link to={"patient/" + props.record.key}>
          Ver Perfil
        </Link>
      </Item>
    : null

  const edit = props
    .user
    .permissions
    .includes('paciente_update')
    ? <Item key="1">
        <Link to={"patient/" + props.record.key + "/edit"}>
          Editar
        </Link>
      </Item>
    : null

  const destroy = props
    .user
    .permissions
    .includes('paciente_destroy')
    ? <Item key="2">
        <a
          onClick={() => Modal("paciente", props.record, () => props.onDelete(props.record))}>
          Eliminar
        </a>
      </Item>
    : null

  const menu = <Menu>
    {show}
    {show && edit
      ? <Divider/>
      : null}
    {edit}
    {edit && destroy
      ? <Divider/>
      : null}
    {destroy}
  </Menu>

  return (<Dropdown menu={menu}/>)
}

export default dropdown
