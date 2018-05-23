import React from "react"
import { Menu } from 'antd'
import { dropdownCard as Dropdown } from "../../../../../components/dropdown/dropdown"
import { Link } from 'react-router-dom'

const MenuItem = Menu.Item
const Divider = Menu.Divider

const menu = (
  <Menu>
    <MenuItem key="1">
      <Link to="/">
        Editar Datos
      </Link>
    </MenuItem>
    <Divider/>
    <MenuItem key="1">
      <Link to="/">
        Eliminar Paciente
      </Link>
    </MenuItem>
  </Menu>
)


  export default props => <Dropdown menu={menu}/>

