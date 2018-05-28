import React from 'react';
import {Row} from 'antd';

const row = props => {

  const justify = props.justify
    ? {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
    : {}

  return (

    <Row gutter={10} style={{padding: 10, ...justify}} {...props}>
      {props.children}
    </Row>
  )
}

export default row
