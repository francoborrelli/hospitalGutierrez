import React from 'react';
import { Col } from 'antd';
import { Icon } from 'react-fa';

const article = props => (
  <Col lg={8} role="Article">
    <div className="iconbox-4">
      <Icon name={props.icon} />
      <br />
      <br />
      <h2 className="heading">{props.title}</h2>
      <p>{props.text}</p>
    </div>
  </Col>
);

export default article;
