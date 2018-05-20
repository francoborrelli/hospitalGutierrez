import React, {Component} from "react";
import {Card, message, Menu, Dropdown, Icon} from "antd";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import html2pdf from "html2pdf.js"

const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class Chart extends Component {
  getSVG = () => {
    let svgURL = new XMLSerializer().serializeToString(this.currentChart.container.firstChild);
    var opt = {
      margin:       1,
      filename:     'myfile.pdf',
      html2canvas	: {windowWidth: 700, width: 700},
    };

    html2pdf(svgURL, opt);
  }

  render = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <a onClick={this.getSVG}>SVG</a>
        </Menu.Item>
      </Menu>
    );

    const extra = (
      <Dropdown overlay={menu} placement="bottomRight">
        <a className="ant-dropdown-link" href="#">...</a>
      </Dropdown>
    )

    return (
      <Card title="report" extra={extra}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
        width={500}
        height={300}
        data={data}
        ref={(chart) => this.currentChart = chart}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      </Card>
    )
  }
}

export default Chart;
