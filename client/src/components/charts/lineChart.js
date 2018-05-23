import React from "react";

import HighchartsChart from "./highcharts"
import { LineSeries } from 'react-jsx-highcharts';


const lineChart = props => {

  const formatter = function(){
    return props.type + ': <b>' + this.x + '<br/><span style="color:'
    + this.series.color
    + '">\u25CF</span> '
    + this.series.name + ': '
    + this.y;
  }

  const config = {
    chart: {
    defaultSeriesType: 'areaspline',
    height: 475
    }
  }

  const series = props
    .series
    .map((element, index) => (<LineSeries key={index} name={element.name} data={element.data}/>))

  return <HighchartsChart formatter={formatter} {...props} {...config}>
    {series}
  </HighchartsChart>
}

export default lineChart
