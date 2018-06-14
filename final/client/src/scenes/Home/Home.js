import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import * as actions from '../../store/actions';
import banner from './images/hospital.jpg';
import Articles from '../../components/articles/articles';

const articles = [
  {
    id: 1,
    icon: 'hospital-o',
    title: 'El Hospital',
    text:
      'Este centro de salud tiene un programa de residencias de primer nivel en el país. Se ofrecen oportunidades de práctica intensiva y supervisada en ámbitos profesionales y por la misma -por supuesto- se recibe un salario mensual, acorde a lo que la regulación médica profesional lo indica en cada momento.'
  },
  {
    id: 2,
    icon: 'heartbeat',
    title: 'Especialidades',
    text:
      'Acorde a una respetable trayectoria en materia de medicina y salud, en Hospital Dr. Ricardo Gutierrez de La Plata podemos encontrar profesionales de las principales especialidades de salud. Del mismo modo se brinda atención programada y de urgencias, se realizan estudios médicos y se brinda soporte en muchas de las ramas comunes de la medicina moderna.'
  },
  {
    id: 3,
    icon: 'stethoscope',
    title: 'Guardia',
    text:
      'Hospital Dr. Ricardo Gutierrez de La Plata dispone de un sofisticado servicio de guardias médicas las 24 horas para la atención de distintas urgencias. La administración de la institución hace viable una eficiente separación de los pacientes según el nivel de seriedad y tipo de patología.'
  }
];

class Home extends Component {
  componentDidMount() {
    if (this.props.login) {
      message.success('Sesión iniciada correctamente.', 3);
      this.props.seeSuccessMessage();
    }else{
      if (this.props.logout) {
        message.success('Se cerró la sesión correctamente.', 3);
        this.props.seeSuccessMessage();
      }
    }
  }

  render() {
    return (
      <Fragment>
        <img className="banner" src={banner} alt="banner" />
        <Articles articles={articles} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  login: state.auth.recentLogin, logout: state.auth.recentLogout
});

const mapDispatchToProps = dispatch => ({
  seeSuccessMessage: () => dispatch(actions.seeSuccessMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
