import React from 'react';

const baseError = props => {
    const Tag = `${props.tag}`;

    return (
    <div className="errores">
        <Tag>{props.title}</Tag>
        <section>{props.body}</section>
    </div>);
}

export default baseError;
