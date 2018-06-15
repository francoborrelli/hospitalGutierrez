import BaseError from './baseError';
import React from 'react';

const error500 = props => (
  <BaseError
    tag="h2"
    title="En mantenimiento"
    body="Intente acceder más tarde"
  />
);

export default error500;
