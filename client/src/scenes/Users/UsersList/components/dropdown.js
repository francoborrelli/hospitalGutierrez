import React from "react"
import { Menu } from "antd"
import Dropdown from "../../../../components/dropdown/dropdown"
import { deleteModal as Modal } from "../../../../components/modal/modal"

const Item = Menu.Item
const Divider = Menu.Divider

const menu = (record, onOk) => {
  return (
    <Menu>
      <Item key="0">
        <a>Editar</a>
      </Item>
      <Divider />
      <Item key="1">
        <a onClick={() => Modal("usuario", record, () => onOk(record))}>
          Eliminar
        </a>
      </Item>
    </Menu>
  )
}

const dropdown = props => <Dropdown menu={menu(props.record, props.onDelete)} />

export default dropdown
