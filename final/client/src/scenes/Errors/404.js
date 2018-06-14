import BaseError from './baseError';
import React from 'react';

const error404 = props => 
    <BaseError tag="h1" title="404" body="Página no encontrada"/>

export default error404;