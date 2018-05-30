import BaseError from './baseError';
import React from 'react';

const error401 = props =>
    <BaseError tag="h1" title="401" body="No autorizado"/>

export default error401;
