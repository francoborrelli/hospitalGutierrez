import React from 'react';
import { Col } from 'antd';

import PieChart from '../../../components/charts/pieChart';
import ColumnChart from '../../../components/charts/columnChart';

const report = props => {
  let Chart = null;

  switch (props.type) {
    case 'pie':
      Chart = PieChart;
      break;
    case 'column':
      Chart = ColumnChart;
      break;
    default:
      break;
  }

  const config = {
    title: props.title,
    subtitle: 'Total de pacientes: ' + props.total,
    data: props.data,
    exporting: {
      filename: 'Reporte: ' + props.title
    }
  };
  const { loading, ...others } = props;

  return (
    <Col md={12} xl={8} {...others}>
      <Chart loading={props.loading} {...config} />
    </Col>
  );
};

export default report;
