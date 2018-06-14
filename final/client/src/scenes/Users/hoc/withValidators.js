import React from 'react';
import axios from '../../../axios-api';

const validateEmail = function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const withValidators = WrappedComponent => {
  const emailValidator = async (form, rule, email, callback, defaultValues) => {
    if (defaultValues && defaultValues.email === email) {
      callback();
    } else {
      if (email && !validateEmail(email)){
        callback("Email Invalido")
      }else{
        const response = await axios.get('/users/emailExists', {
          params: { email }
        });
        if (response.data) {
          callback('El email ya se encuentra registrado en el sistema');
        }
      }
      callback();
    }
  };

  const compareToFirstPassword = (form, rule, value, callback) => {
    if (value && value.length > 6 && value !== form.getFieldValue('password')) {
      callback('Las contraseñas no son iguales');
    } else {
      callback();
    }
  };

  const revalidate = (form, rule, value, callback) => {
    const field = form.getFieldValue('confirmPass');
    if (field) {
      form.validateFields(['confirmPass'], { force: true });
    }
    callback();
  };

  return props => (
    <WrappedComponent
      emailValidator={(form, rule, email, callback) =>
        emailValidator(form, rule, email, callback, props.defaultValues)
      }
      compareToFirstPassword={compareToFirstPassword}
      revalidate={revalidate}
      {...props}
    />
  );
};

export default withValidators;
