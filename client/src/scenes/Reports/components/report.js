import React from "react";
import {Col} from 'antd';

import PieChart from '../../../components/charts/pieChart';
import ColumnChart from '../../../components/charts/columnChart';

const report = props => {
  let Chart = null

  switch (props.type) {
    case "pie":
      Chart = PieChart
      break;
    case "column":
      Chart = ColumnChart
      break;
  }

  const config = {
    title: props.title,
    subtitle: "Total de pacientes: " + props.total,
    data: props.data,
    exporting: {
      filename: "Reporte: " + props.title
    }
  }
  return <Col md={12} xl={8} {...props}><Chart {...config}/></Col>
}

export default report;
