import React from 'react';
import { Menu } from 'antd';
import Dropdown from '../../../../components/dropdown/dropdown';
import { deleteModal as Modal } from '../../../../components/modal/modal';
import { Link } from 'react-router-dom';

const Item = Menu.Item;
const Divider = Menu.Divider;

const dropdown = props => {
  const check = (element, permission) => {
    return props.user.permissions.includes(permission) ? element : null;
  };

  const show = check(
    <Item key="0">
      <Link to={'patient/' + props.record.key}>Ver Perfil</Link>
    </Item>,
    'paciente_show'
  );

  const edit = check(
    <Item key="1">
      <Link to={'patient/' + props.record.key + '/edit'}>Editar</Link>
    </Item>,
    'paciente_update'
  );

  const destroy = check(
    <Item key="2">
      <a
        onClick={() =>
          Modal('paciente', props.record, () => props.onDelete(props.record))
        }
      >
        Eliminar
      </a>
    </Item>,
    'paciente_destroy'
  );

  const clinic = check(
    <Item key="3">
      <Link to={'patient/' + props.record.key + '/addRecord'}>
        Agregar Control
      </Link>
    </Item>,
    'control_new'
  );

  const menu = (
    <Menu>
      {show}
      {show && clinic ? <Divider /> : null}
      {clinic}
      {(show || clinic) && edit ? <Divider /> : null}
      {edit}
      {edit && destroy ? <Divider /> : null}
      {destroy}
    </Menu>
  );

  return <Dropdown menu={menu} />;
};

export default dropdown;
