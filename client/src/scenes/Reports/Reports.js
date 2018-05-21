import React, {Component} from "react";

import {Row} from "antd";
import Report from "./components/report"
import Section from "../../components/header/sectionHeader/sectionHeader"

class Reports extends Component {
  state = {
    loading: true,
    total: 10,

    //MOCK DATA
    pieData: [
      {
        name: 'Jane',
        y: 13
      }, {
        name: 'John',
        y: 23
      }, {
        name: 'Joe',
        y: 19
      }
    ],
    columnData: [
      {
        name: 'No',
        data: [
          {
            y: 10
          }
        ]
      }, {
        name: 'Si',
        data: [
          {
            y: 23
          }
        ]
      }
    ]
  }

  render = () => (
    <Section title="Reportes">
      <Row gutter={10} style={{padding: 10}}>
        <Report
          type="pie"
          title="Tipos de Viviendas"
          data={this.state.pieData}
          total={this.state.total}/>
        <Report
          type="pie"
          title="Tipos de Agua"
          data={this.state.pieData}
          total={this.state.total}/>
        <Report
          type="pie"
          title="Tipos de Calefacción"
          data={this.state.pieData}
          total={this.state.total}/>
        <Report
          type="column"
          title="Pacientes con electricidad"
          data={this.state.columnData}
          total={this.state.total}/>
        <Report
          type="column"
          title="Pacientes con Heladera"
          data={this.state.columnData}
          total={this.state.total}/>
        <Report
          type="column"
          title="Pacientes con Mascotas"
          data={this.state.columnData}
          total={this.state.total}/>
      </Row>
    </Section>
  )

}

export default Reports;
