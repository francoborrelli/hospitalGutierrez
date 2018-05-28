import React from "react"
import {Menu} from 'antd'
import {dropdownCard as Dropdown} from "../../../../../components/dropdown/dropdown"
import {Link} from 'react-router-dom'
import {deleteModal as Modal} from "../../../../../components/modal/modal"
import {withRouter} from 'react-router-dom';

const Item = Menu.Item
const Divider = Menu.Divider

const dropdown = props => {
  const edit = props
    .user
    .permissions
    .includes('paciente_update')
    ? <Item key="0">
        <Link to={props.match.url + "/edit"}>
          Editar Datos
        </Link>
      </Item>
    : null

  const destroy = props
    .user
    .permissions
    .includes('paciente_destroy')
    ? <Item key="1">
        <a
          onClick={() => Modal("paciente", props.patient, () => props.onDelete(props.patient))}>
          Eliminar Paciente
        </a>
      </Item>
    : null

  const menu = edit || destroy
    ? (
      <Menu>
        {edit}
        {edit && destroy
          ? <Divider/>
          : null}
        {destroy}
      </Menu>
    )
    : null

return (menu
  ? <Dropdown menu={menu}/>
  : null)
}

export default withRouter(dropdown)
