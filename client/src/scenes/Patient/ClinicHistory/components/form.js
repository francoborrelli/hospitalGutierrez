import React from 'react';
import { Card } from 'antd';
import { withRouter } from 'react-router-dom';

import Form from '../../../../containers/Form/Form';

const formatter = (value, metric) => {
  return value ? value + ' ' + metric : '';
};
const parser = value => value.replace('cm', '').replace(/\s/g, '');

const recordForm = props => {
  const fields = {
    date: {
      name: 'controlDate',
      label: 'Fecha del control',
      type: 'datePicker',
      props: { placeholder: 'Fecha del control' },
      rules: [
        {
          type: 'object',
          required: true,
          message: 'Ingrese la fecha del control'
        }
      ]
    },
    weight: {
      name: 'weight',
      label: 'Peso',
      type: 'inputNumber',
      props: {
        style: { width: '100%' },
        min: 0.1,
        step: 0.1,
        formatter: value => formatter(value, 'kg'),
        parser: value => value.replace('kg', '').replace(/\s/g, '')
      },
      rules: [{ required: true, message: 'Ingrese el peso' }]
    },
    height: {
      name: 'height',
      label: 'Talla',
      type: 'inputNumber',
      props: {
        style: { width: '100%' },
        min: 0.1,
        step: 0.1,
        formatter: value => formatter(value, 'cm'),
        parser: parser
      }
    },
    pc: {
      name: 'pc',
      label: 'PC',
      type: 'inputNumber',
      props: {
        style: { width: '100%' },
        min: 0.1,
        step: 0.1,
        formatter: value => formatter(value, 'cm'),
        parser: parser
      }
    },
    ppc: {
      name: 'ppc',
      label: 'PPC',
      type: 'inputNumber',
      props: {
        style: { width: '100%' },
        min: 0.1,
        step: 0.1,
        formatter: value => formatter(value, 'cm'),
        parser: parser
      }
    },
    vaccination: {
      name: 'vaccination',
      label: '¿Vacunas al día?',
      type: 'select',
      props: { placeholder: 'Seleccione una opción' },
      options: [{ id: 0, nombre: 'Si' }, { id: 1, nombre: 'No' }],
      rules: [{ required: true, message: 'Seleccione una opción' }]
    },
    vaccinationObservation: {
      name: 'vaccinationObservation',
      label: 'Observaciones - Vacunación',
      type: 'textarea'
    },
    maturation: {
      name: 'maturation',
      label: '¿Maduración acorde?',
      type: 'select',
      props: { placeholder: 'Seleccione una opción' },
      options: [{ id: 0, nombre: 'Si' }, { id: 1, nombre: 'No' }],
      rules: [{ required: true, message: 'Seleccione una opción' }]
    },
    madurationObservation: {
      name: 'maturationObservation',
      label: 'Observaciones - Maduración',
      type: 'textarea'
    },
    fisicTest: {
      name: 'fisicTest',
      label: '¿Examen físico normal?',
      type: 'select',
      props: { placeholder: 'Seleccione una opción' },
      options: [{ id: 0, nombre: 'Si' }, { id: 1, nombre: 'No' }],
      rules: [{ required: true, message: 'Seleccione una opción' }]
    },
    fisicTestObservation: {
      name: 'fisicTestObservation',
      label: 'Observaciones - Examen Físico',
      type: 'textarea'
    },
    nutrition: {
      name: 'nutrition',
      label: 'Alimentación',
      type: 'textarea'
    },
    generalObservation: {
      name: 'generalObservation',
      label: 'Observaciones Generales',
      type: 'textarea'
    },
    user: {
      name: 'user',
      type: 'input',
      props: { type: 'hidden' }
    }
  };

  const submit = data => {
    const result = {
      ...data,
      vaccination: data.vaccination === 0 ? true : false,
      maturation: data.maturation === 0 ? true : false,
      fisicTest: data.fisicTest === 0 ? true : false
    };
    props.submit(result);
  };

  return (
    <div style={{ margin: 10 }}>
      <Card title={props.title} style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <Form
            onCancel={props.history.goBack}
            fields={fields}
            submitted={submit}
            {...props}
            buttonText={props.btnText ? props.btnText : 'Confirmar'}
          />
        </div>
      </Card>
    </div>
  );
};

export default withRouter(recordForm);
