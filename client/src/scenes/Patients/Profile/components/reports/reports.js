import React from "react"

import { Tabs, Card } from 'antd';
import WeightReport from "./weightReport"
import HeightReport from "./heightReport"
import PpcReport from "./ppcReport"

const TabPane = Tabs.TabPane;

const reports = props => {
  return (
    <Card bodyStyle={{padding: "10px 20px"}}>
      <Tabs defaultActiveKey="1" size="small">
        <TabPane tab="Curva de PPC" key="1"><PpcReport patient={props.patient}/></TabPane>
        <TabPane tab="Curva de Talla" key="2"><HeightReport patient={props.patient}/></TabPane>
        <TabPane tab="Curva de Crecimiento" key="3"><WeightReport patient={props.patient}/></TabPane>
      </Tabs>
    </Card>
  )
}

export default reports
