import React from 'react';
import { Menu } from 'antd';
import Dropdown from '../../../../../components/dropdown/dropdown';
import { deleteModal as Modal } from '../../../../../components/modal/modal';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const Item = Menu.Item;
const Divider = Menu.Divider;

const dropdown = props => {
  const check = (element, permission) => {
    return props.user.permissions.includes(permission) ? element : null;
  };

  const show = (
    <Item key="0">
      <Link to={props.match.path + '/record/' + props.record.key}>Ver</Link>
    </Item>
  );

  const update = (
    <Item key="1">
      <Link to={props.match.path + '/record/' + props.record.key + '/edit'}>
        Editar
      </Link>
    </Item>
  );

  const destroy = (
    <Item key="2">
      <a
        onClick={() =>
          Modal(
            'control del día ' + props.record.date + ' de',
            props.patient,
            () => props.onOk(props.record)
          )
        }
      >
        Eliminar
      </a>
    </Item>
  );

  const menu = (
    <Menu>
      {check(show, 'control_show')}
      {show && (update || destroy) ? <Divider /> : null}
      {check(update, 'control_update')}
      {destroy && update ? <Divider /> : null}
      {check(destroy, 'control_destroy')}
    </Menu>
  );

  return <Dropdown menu={menu} />;
};

export default withRouter(dropdown);
