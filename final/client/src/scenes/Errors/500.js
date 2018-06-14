import BaseError from './baseError';
import React from 'react';

const error500 = props => 
    <BaseError tag="h1" title="500" body="Error interno del servidor"/>

export default error500;