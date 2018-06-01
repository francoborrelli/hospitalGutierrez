import React, { Component } from 'react';
import { Row, Col, message } from 'antd';

import RowGutter from '../../components/grid/row';
import Section from '../../components/header/sectionHeader/sectionHeader';
import PageConfiguration from './components/pageConfiguration';
import MantainmentConfiguration from './components/mantainmentConfiguration';
import ElementsConfiguration from './components/elementsConfiguration';
import hasPermission from '../../hoc/hasPermission';

import { connect } from 'react-redux';
import axios from '../../axios-api';
import * as actions from '../../store/actions';

class Configuration extends Component {
  state = {
    pageInfoRequest: false,
    elementsRequest: false,
    mantaintmentRequest: false
  };

  updatePageInfoHandler = data => {
    this.setState({ pageInfoRequest: true });
    axios
      .patch('/site', data)
      .then(() => {
        this.props.appChangeData(data)
        this.setState({ pageInfoRequest: false });
        message.success('Datos actualizados correctamente.');
      })
      .catch(() => {
        message.error('Ha ocurrido un error. Intenta nuevamente');
      });
  };

  updateElementsNumberHandler = data => {
    this.setState({ elementsRequest: true });
    axios
      .patch('/site', data)
      .then(() => {
        this.props.appChangeElements(data.listAmount)
        this.setState({ elementsRequest: false });
        message.success('Se actualizó la cantidad de elementos correctamente.');
      })
      .catch(() => {
        message.error('Ha ocurrido un error. Intenta nuevamente');
      });
  };

  mantaintmentHandler = boolean => {
    this.setState({ mantaintmentRequest: true });
    axios
      .patch('/site', { enabled: boolean })
      .then(() => {
        this.setState({ mantaintmentRequest: false });
        if (!boolean) {
          message.warning('El sitio se puso en mantenimiento.');
          this.props.appDisabled();
        } else {
          message.success('El sitio ya no se encuentra en mantenimiento.');
          this.props.appEnabled();
        }
      })
      .catch(() => {
        message.error('Ha ocurrido un error. Intenta nuevamente');
      });
  };

  render() {
    return (
      <Section title="Configuración">
        <RowGutter>
          <Col
            xs={24}
            xl={14}
            style={{
              marginBottom: 10
            }}
          >
            <PageConfiguration
              values={this.props.site}
              loading={this.state.pageInfoRequest}
              submitted={this.updatePageInfoHandler}
            />
          </Col>
          <Col xs={24} xl={10}>
            <Row gutter={10}>
              <Col
                md={12}
                xl={24}
                xxl={12}
                style={{
                  marginBottom: 10
                }}
              >
                <ElementsConfiguration
                  value={this.props.site.listAmount}
                  submitted={this.updateElementsNumberHandler}
                  loading={this.state.elementsRequest}
                />
              </Col>
              <Col md={12} xl={24} xxl={12}>
                <MantainmentConfiguration
                  data={this.props.site.enabled}
                  value={this.props.site.enabled}
                  loading={this.state.mantaintmentRequest}
                  clicked={this.mantaintmentHandler}
                />
              </Col>
            </Row>
          </Col>
        </RowGutter>
      </Section>
    );
  }
}

const mapStateToProps = state => ({ site: state.app });
const mapDispatchToProps = dispatch => ({
  appEnabled: () => dispatch(actions.appEnabled()),
  appDisabled: () => dispatch(actions.appDisabled()),
  appChangeElements: (listAmount) => dispatch(actions.appChangeElements(listAmount)),
  appChangeData: (data) => dispatch(actions.appChangeData(data))
});

export default hasPermission(
  connect(mapStateToProps, mapDispatchToProps)(Configuration),
  ['config_index', 'config_update']
);
