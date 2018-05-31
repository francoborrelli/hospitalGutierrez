import React, {Component} from "react";
import {message} from "antd"
import axios from '../../axios-api';

import Report from "./components/report"
import Section from "../../components/header/sectionHeader/sectionHeader"
import Row from "../../components/grid/row";
import hasPermission from "../../hoc/hasPermission"
import withApiRefData from '../../hoc/withApiRefData';

class Reports extends Component {
  state = {
    loading: true,
    total: 10,
    withRefrigerator: [],
    withElectricity: [],
    withPet: [],
  }

  componentDidMount = () => {
    axios
      .get('reports')
      .then((response) => {
        const data = response.data
        const apiData = this.props.apiData
        this.setState({
          total: data.totalPatients,
          heatingTypes: this.getPieData(apiData.heatingTypes, data.heatingTypes),
          houseTypes: this.getPieData(apiData.houseTypes, data.houseTypes),
          waterTypes: this.getPieData(apiData.waterTypes, data.waterTypes),
          withRefrigerator: this.getColumnData(data.withRefrigerator),
          withElectricity: this.getColumnData(data.withElectricity),
          withPet: this.getColumnData(data.withPet),
          loading: false
        })
      })
      .catch(() => {
        message.error('Hubo un error. Intenta nuevamente')
      })
  }

  getPieData = (apiData, data) => {
    const result = []
    apiData.forEach(element => {
      let e = data.find(x => parseInt(x.id, 10) == element.id)
      if (e) {
        result.push({name: element.nombre, y: e.amount})
      } else {
        result.push({name: element.nombre, y: 0})
      }
    });
    return result
  }

  getColumnData = (data) => [{name: "Si",data: [{y: data.yes}]}, {name: "No", data: [{y: data.no}]}]

  render = () => (
    <Section title="Reportes">
      <Row>
        <Report
          type="pie"
          title="Tipos de Viviendas"
          loading={this.state.loading}
          data={this.state.houseTypes}
          total={this.state.total}/>
        <Report
          type="pie"
          title="Tipos de Agua"
          loading={this.state.loading}
          data={this.state.waterTypes}
          total={this.state.total}/>
        <Report
          type="pie"
          title="Tipos de Calefacción"
          loading={this.state.loading}
          data={this.state.heatingTypes}
          total={this.state.total}/>
        <Report
          type="column"
          title="Pacientes con electricidad"
          loading={this.state.loading}
          data={this.state.withElectricity}
          total={this.state.total}/>
        <Report
          type="column"
          title="Pacientes con Heladera"
          loading={this.state.loading}
          data={this.state.withRefrigerator}
          total={this.state.total}/>
        <Report
          type="column"
          title="Pacientes con Mascotas"
          data={this.state.withPet}
          loading={this.state.loading}
          total={this.state.total}/>
      </Row>
    </Section>
  )

}

export default withApiRefData()(hasPermission(Reports, ['reportes_index']))
