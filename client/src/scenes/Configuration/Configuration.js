import React, { Component } from "react"
import {Row, Col, message} from "antd"

import RowGutter from '../../components/grid/row';
import Section from "../../components/header/sectionHeader/sectionHeader"
import PageConfiguration from "./components/pageConfiguration"
import MantainmentConfiguration from "./components/mantainmentConfiguration"
import ElementsConfiguration from "./components/elementsConfiguration"
import hasPermission from "../../hoc/hasPermission"

import {connect} from 'react-redux';

class Configuration extends Component {
  state = {
    pageInfoRequest: false,
    elementsRequest: false,
    mantaintmentRequest: false,
  }

  componentDidMount = () => {
    //Get data
  }

  updatePageInfoHandler = data => {
    this.setState({pageInfoRequest: true})
    //resquest
    this.setState({pageInfoRequest: false})
    message.success("Datos actualizados correctamente.")
  }

  updateElementsNumberHandler = data => {
    this.setState({elementsRequest: true})
    //resquest
    this.setState({elementsRequest: false})
    message.success("Se actualizó la cantidad de elementos correctamente.")
  }

  mantaintmentHandler = boolean => {
    this.setState({mantaintmentRequest: true})
    //resquest
    this.setState({mantaintmentRequest: false})
    if (boolean){
      message.info("El sitio ya no esta en mantenimiento.")
    }else{
      message.warning("El sitio está en mantenimiento.")
    }
  }

  render() {
    return (
      <Section title="Configuración">
        <RowGutter>
          <Col xs={24} xl={14} style={{marginBottom: 10}}>
            <PageConfiguration
            values={this.props.site}
            loading={this.state.pageInfoRequest}
            submitted={this.updatePageInfoHandler}
            />
          </Col>
          <Col xs={24} xl={10}>
            <Row gutter={10}>
              <Col md={12} xl={24} xxl={12} style={{marginBottom: 10}}>
                <ElementsConfiguration
                value={this.props.site.listAmount}
                submitted={this.updateElementsNumberHandler}
                loading={this.state.elementsRequest}
                />
              </Col>
              <Col md={12} xl={24} xxl={12}>
                <MantainmentConfiguration
                value={this.props.site.enabled}
                loading={this.state.mantaintmentRequest}
                clicked={this.mantaintmentHandler}
                />
              </Col>
            </Row>
          </Col>
        </RowGutter>
      </Section>
    )
  }
}

const mapStateToProps = state => ({site: state.app});

export default hasPermission(connect(mapStateToProps)(Configuration), ['config_index', 'config_update'])
