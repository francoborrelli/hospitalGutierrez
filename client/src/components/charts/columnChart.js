import React from "react";

import HighchartsChart from "./highcharts"
import {ColumnSeries} from 'react-jsx-highcharts';

const columnChart = props => {
  let columns = props
    .data
    .map((element, index) =>(
    <ColumnSeries
      key={index}
      name={element.name}
      data={element.data}
    />)
  )
  return (
    <HighchartsChart {...props}>
      {columns}
    </HighchartsChart>
  )
}

export default columnChart
