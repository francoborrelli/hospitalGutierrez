import React from "react";

import HighchartsChart from "./highcharts"
import {ColumnSeries, Tooltip} from 'react-jsx-highcharts';

const columnChart = props =>  {
  console.log(props.data)
  let columns = props.data.map((element, index) => <ColumnSeries key={index} name={element.name} data={element.data}/>)
  return (
  <HighchartsChart {...props}>
    {columns}
    <Tooltip></Tooltip>
  </HighchartsChart>)}

export default columnChart
