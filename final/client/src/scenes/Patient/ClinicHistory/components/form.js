import React from 'react';
import { Card } from 'antd';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
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
      props: {
        placeholder: 'Fecha del control',
        disabledDate: currentDate =>
          currentDate <= moment(props.patient.birthday) ||
          currentDate >= moment()
      },
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

  const getValue = field => {
    return typeof field !== 'undefined' ? field : null;
  };

  const setNull = field => {
    return field !== '' ? field : null;
  };

  const submit = data => {
    const result = {
      ...data,
      height: getValue(data.height),
      pc: getValue(data.pc),
      ppc: getValue(data.ppc),
      fisicTestObservation: setNull(data.fisicTestObservation),
      maturationObservation: setNull(data.maturationObservation),
      generalObservation: setNull(data.generalObservation),
      vaccinationObservation: setNull(data.vaccinationObservation),
      nutrition: setNull(data.nutrition),
      fisicTest: data.fisicTest === 0,
      maturation: data.maturation === 0,
      vaccination: data.vaccination === 0
    };
    props.submit(result);
  };

  const defaultValues = props.record
    ? {
        weight: props.record.weight,
        height: props.record.height,
        pc: props.record.pc,
        ppc: props.record.ppc,
        fisicTestObservation: props.record.fisicTestObservation,
        maturationObservation: props.record.maturationObservation,
        generalObservation: props.record.generalObservation,
        vaccinationObservation: props.record.vaccinationObservation,
        nutrition: props.record.nutrition,
        fisicTest: props.record.fisicTest ? 0 : 1,
        maturation: props.record.maturation ? 0 : 1,
        vaccination: props.record.vaccination ? 0 : 1,
        controlDate: moment(props.record.controlDate)
      }
    : {};

  return (
    <div style={{ margin: 10 }}>
      <Card title={props.title} style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <Form
            onCancel={props.history.goBack}
            fields={fields}
            submitted={submit}
            defaultValues={defaultValues}
            {...props}
            buttonText={props.btnText ? props.btnText : 'Confirmar'}
          />
        </div>
      </Card>
    </div>
  );
};

export default withRouter(recordForm);
