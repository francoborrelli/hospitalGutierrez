import React from "react"
import {Menu} from 'antd'
import {dropdownCard as Dropdown} from "../../../../../components/dropdown/dropdown"
import {Link} from 'react-router-dom'
import {deleteModal as Modal} from "../../../../../components/modal/modal"
import {withRouter} from 'react-router-dom';

const Item = Menu.Item
const Divider = Menu.Divider

const dropdown = props => {
  const menu = () => {
    return (
      <Menu>
        <Item key="0">
          <Link to={"./edit"}>
            Editar Datos
          </Link>
        </Item>
        <Divider/>
        <Item key="1">
          <a onClick={() => Modal("paciente", props.patient, () => props.onDelete(props.patient))}>
            Eliminar Paciente
          </a>
        </Item>
      </Menu>
    )
  }

  return (<Dropdown menu={menu(props.patient, props.onDelete)}/>)
}

export default withRouter(dropdown)
