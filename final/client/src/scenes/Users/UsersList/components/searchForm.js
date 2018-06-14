import React from 'react';
import { Card } from 'antd';
import Form from '../../../../containers/Form/Form';

const searchForm = props => {
  const fields = {
    username: {
      name: 'username',
      props: {
        placeholder: 'Nombre de Usuario'
      },
      type: 'input'
    },
    state: {
      name: 'state',
      type: 'select',
      props: {
        placeholder: 'Estado',
        allowClear: true
      },
      options: [
        { id: 'active', nombre: 'Activo' },
        { id: 'deleted', nombre: 'Bloqueado' }
      ]
    }
  };

  return (
    <Card title="Buscar" style={{ marginBottom: 10 }}>
      <Form
        className="ant-advanced-search-form"
        fields={fields}
        {...props}
        layout="vertical"
        buttonText="Buscar"
      />
    </Card>
  );
};

export default searchForm;
