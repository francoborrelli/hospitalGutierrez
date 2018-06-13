import React from 'react';
import { Menu } from 'antd';
import { dropdownCard as Dropdown } from '../../../../../components/dropdown/dropdown';
import { deleteModal as Modal } from '../../../../../components/modal/modal';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const Item = Menu.Item;
const Divider = Menu.Divider;

const dropdown = props => {
  const edit = props.user.permissions.includes('control_update') ? (
    <Item key="1">
      <Link to={props.location.pathname + '/edit'}>Editar</Link>
    </Item>
  ) : null;

  const destroy = props.user.permissions.includes('control_destroy') ? (
    <Item key="2">
      <a
        onClick={() =>
          Modal(
            'control del día ' +
              moment(props.record.controlDate).format('DD/MM/YYYY') +
              ' de',
            props.patient,
            () => props.onDelete(props.patient)
          )
        }
      >
        Eliminar
      </a>
    </Item>
  ) : null;

  const menu = (
    <Menu>
      {edit}
      {edit && destroy ? <Divider /> : null}
      {destroy}
    </Menu>
  );

  return <Dropdown {...props} menu={menu} />;
};

export default withRouter(dropdown);
