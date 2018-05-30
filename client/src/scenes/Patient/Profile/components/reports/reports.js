import React, {Component} from "react"

import {Tabs, Card} from 'antd';
import WeightReport from "./weightReport"
import HeightReport from "./heightReport"
import PpcReport from "./ppcReport"

const TabPane = Tabs.TabPane;

class Reports extends Component {
  state = {
    loading: true,
    ppc: [],
    height: [],
    weight: []
  }

  componentDidMount = () => {
    //request Data
    this.setState({loading: true})
  }

  render() {
    return (
      <Card bodyStyle={{padding: "10px 20px"}} loading={this.props.loading}>
        <Tabs defaultActiveKey="1" size="small">
          <TabPane tab="Curva de PPC" key="1"><PpcReport patient={this.props.patient}/></TabPane>
          <TabPane tab="Curva de Talla" key="2"><HeightReport patient={this.props.patient}/></TabPane>
          <TabPane tab="Curva de Crecimiento" key="3"><WeightReport patient={this.props.patient}/></TabPane>
        </Tabs>
      </Card>
    )
  }
}

export default Reports
