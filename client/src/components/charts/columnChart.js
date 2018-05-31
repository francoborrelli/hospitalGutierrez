import React from "react"
import {Card} from "antd"
import HighchartsChart from "./highcharts"
import {ColumnSeries} from 'react-jsx-highcharts'

const columnChart = props => {
  let columns = props.data ? props
    .data
    .map((element, index) =>(
    <ColumnSeries
      key={index}
      name={element.name}
      data={element.data}
    />)
  ) : null

  return (
    <Card loading={props.loading} style={{marginBottom: 10,minHeight: 300}}>
    <HighchartsChart {...props}>
      {columns}
    </HighchartsChart>
    </Card>
  )
}

export default columnChart
