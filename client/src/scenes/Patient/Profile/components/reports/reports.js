import React, { Component } from 'react';

import { Tabs, Card, message } from 'antd';
import WeightReport from './weightReport';
import HeightReport from './heightReport';
import PpcReport from './ppcReport';
import axios from '../../../../../axios-api';

const TabPane = Tabs.TabPane;

class Reports extends Component {
  state = {
    loading: true,
    ppc: [],
    height: [],
    weight: []
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.patient.clinicalRecords !== this.props.patient.clinicalRecords
    ) {
      axios
        .get('/patients/' + this.props.patient._id + '/reports')
        .then(response => {
          this.setState({
            ppc: response.data.ppc,
            height: response.data.height,
            weight: response.data.weight,
            loading: false
          });
        })
        .catch(() => {
          message.error('Ocurrió un error. Intenta nuevamente');
          this.setState({ loading: false });
        });
    }
  };

  render() {
    return (
      <Card bodyStyle={{ padding: '10px 20px'}} style={{minHeight: 250}} loading={this.props.loading && this.state.loading}>
        <Tabs defaultActiveKey="1" size="small">
          <TabPane tab="Curva de PPC" key="1">
            <PpcReport patient={this.props.patient} data={this.state.ppc} />
          </TabPane>
          <TabPane tab="Curva de Talla" key="2">
            <HeightReport patient={this.props.patient} data={this.state.height} />
          </TabPane>
          <TabPane tab="Curva de Crecimiento" key="3">
            <WeightReport patient={this.props.patient} data={this.state.weight} />
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default Reports;
