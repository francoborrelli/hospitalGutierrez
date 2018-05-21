import React from 'react';
import {Row} from 'antd';

const row = props =>(
  <Row gutter={10} style={{padding: 10}} {...props}>
    {props.children}
  </Row>
  )

export default row
