import React from "react";

import HighchartsChart from "./highcharts"
import {LineSeries} from 'react-jsx-highcharts';

const lineChart = props => {
  const series = props
    .series
    .map((element, index) => (<LineSeries key={index} name={element.name} data={element.data}/>))

  return <HighchartsChart {...props}>
    {series}
  </HighchartsChart>
}

export default lineChart
