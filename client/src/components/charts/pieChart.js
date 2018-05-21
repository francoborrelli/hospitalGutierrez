import React from "react";

import HighchartsChart from "./highcharts"
import {PieSeries} from 'react-jsx-highcharts';

const pieChart = props => {
  return <HighchartsChart {...props}>
    <PieSeries data={props.data} showInLegend={true}/>
  </HighchartsChart>
}

export default pieChart
