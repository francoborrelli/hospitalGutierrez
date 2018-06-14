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

  const show = (
    <Item key="0">
      <Link to={'patient/' + props.record.key}>Ver Perfil</Link>
    </Item>
  );

  const edit = (
    <Item key="1">
      <Link to={'patient/' + props.record.key + '/edit'}>Editar</Link>
    </Item>
  );

  const destroy = (
    <Item key="2">
      <a onClick={() => Modal('paciente', props.record, () => props.onDelete(props.record))}>
        Eliminar
      </a>
    </Item>
  );

  const clinic = (
    <Item key="3">
      <Link to={'patient/' + props.record.key + '/addRecord'}>Agregar Control</Link>
    </Item>
  );

  const menu = (
    <Menu>
      {check(show, 'paciente_show')}
      {show && clinic ? <Divider /> : null}
      {check(clinic, 'control_new')}
      {clinic && edit ? <Divider /> : null}
      {check(edit, 'paciente_update')}
      {edit && destroy ? <Divider /> : null}
      {check(destroy, 'paciente_destroy')}
    </Menu>
  );

  return <Dropdown menu={menu} />;
};

export default dropdown;
