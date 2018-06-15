import React from 'react';

import { Card } from 'antd';

import Form from '../../../../containers/Form/Form';
import withValidations from '../../hoc/withValidators';

const passwordForm = props => {
  const fields = {
    password: {
      name: 'password',
      label: 'Nueva Contraseña',
      type: 'input',
      props: {
        type: 'password'
      },
      rules: [
        {
          required: true,
          whitespace: true,
          message: 'Ingrese la contraseña'
        },
        { min: 6, message: 'Debe tener al menos 6 caracteres' }
      ],
      customValidator: props.revalidate
    },
    confirmPassword: {
      name: 'confirmPass',
      label: 'Confirmar Contraseña',
      type: 'input',
      props: {
        type: 'password'
      },
      rules: [
        {
          required: true,
          whitespace: true,
          message: 'Reingrese la contraseña'
        },
        { min: 6, message: 'Debe tener al menos 6 caracteres' }
      ],
      customValidator: props.compareToFirstPassword
    }
  };

  return (
    <Card title="Reestablecer Contraseña">
      <Form layout="vertical" fields={fields} {...props} />
    </Card>
  );
};

export default withValidations(passwordForm);
