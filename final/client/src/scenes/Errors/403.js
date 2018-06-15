import BaseError from './baseError';
import React from 'react';

const error403 = props => (
  <BaseError tag="h1" title="403" body="Permiso denegado" />
);

export default error403;
