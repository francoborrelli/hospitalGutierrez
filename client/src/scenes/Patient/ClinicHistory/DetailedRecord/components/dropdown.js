import React from "react"
import {Menu} from "antd"
import {dropdownCard as Dropdown} from "../../../../../components/dropdown/dropdown"
import {deleteModal as Modal} from "../../../../../components/modal/modal"
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const Item = Menu.Item
const Divider = Menu.Divider

const dropdown = props => {
  const menu = (
    <Menu>
      <Item key="0">
        {console.log(props)}
        <Link to={props.match.path + "/record/"}>
          Volver
        </Link>
      </Item>
      <Divider/>
      <Item key="1">
        <a>Editar</a>
      </Item>
      <Divider/>
    </Menu>
  )

return (<Dropdown menu={menu}/>)
}

export default withRouter(dropdown)
