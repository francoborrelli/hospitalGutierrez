import React from "react";
import {Card} from "antd"
import HighchartsChart from "./highcharts"
import {PieSeries} from 'react-jsx-highcharts'

const pieChart = props => {
  return (
  <Card loading={props.loading} style={{marginBottom: 10,minHeight: 300}}>
  <HighchartsChart {...props}>
    <PieSeries data={props.data} showInLegend={true}/>
  </HighchartsChart>
  </Card>
  )
}

export default pieChart
