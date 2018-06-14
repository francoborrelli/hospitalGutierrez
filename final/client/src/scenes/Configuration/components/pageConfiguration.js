import React from 'react';
import { Card } from 'antd';
import Icon from '../../../components/icon/icon';
import Form from '../../../containers/Form/Form';

const titleIcon = <Icon type="flag" />;
const emailIcon = <Icon type="mail" />;
const descriptionIcon = <Icon type="idcard" />;

const fields = {
  title: {
    name: 'title',
    type: 'input',
    rules: [
      {
        required: true,
        message: 'Ingrese el título',
        whitespace: true
      },
      {
        max: 40,
        message: 'No debe tener más de 40 caracteres'
      }
    ],
    props: {
      placeholder: 'Título',
      prefix: titleIcon
    }
  },
  email: {
    name: 'email',
    type: 'input',
    rules: [
      {
        required: true,
        message: 'Ingrese el email',
        whitespace: true
      },
      {
        type: 'email',
        message: 'Email inválido'
      }
    ],
    props: {
      placeholder: 'Email',
      prefix: emailIcon
    }
  },
  footer: {
    name: 'footer',
    type: 'input',
    rules: [
      {
        required: true,
        message: 'Ingrese la descripción',
        whitespace: true
      }
    ],
    props: {
      placeholder: 'Descripción del sitio',
      prefix: descriptionIcon
    }
  }
};

const pageConfiguration = props => {
  const data = {
    email: props.values.email,
    footer: props.values.footer,
    title: props.values.title
  };

  return (
    <Card title="Datos del Sitio" style={{ padding: '8px 0px' }}>
      <Form
        className="ant-advanced-search-form"
        reset
        fields={fields}
        defaultValues={data}
        {...props}
        style={{ padding: '0px 20px' }}
        buttonText="Guardar"
      />
    </Card>
  );
};

export default pageConfiguration;
