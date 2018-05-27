import React from "react"
import {Menu} from "antd"
import Dropdown from "../../../../components/dropdown/dropdown"
import {deleteModal as Modal} from "../../../../components/modal/modal"
import {Link} from 'react-router-dom';

const Item = Menu.Item
const Divider = Menu.Divider

const dropdown = props => {
  const menu = props.record.status === "Activo"
    ? (
      <Menu>
        <Item key="0">
          <Link to={"user/" + props.record.key + "/edit"}>
            Editar
          </Link>
        </Item>
        <Divider/>
        <Item key="1">
          <a
            onClick={() => Modal("usuario", props.record, () => props.onDelete(props.record), "bloquear")}>
            Bloquear
          </a>
        </Item>
      </Menu>
    )
    : (
      <Menu>
        <Item key="1">
          <a
            onClick={() => Modal("usuario", props.record, () => props.onDelete(props.record), "activar")}>
            Activar
          </a>
        </Item>
      </Menu>
    )

  return (<Dropdown menu={menu}/>)
}

export default dropdown
