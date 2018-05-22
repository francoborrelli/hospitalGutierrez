import React, {Component} from "react"

import { Col} from 'antd';
import Row from '../../../components/grid/row';

import Section from './components/patientHeader';
import PatientCard from './components/personalData/personalData'
import Reports from './components/reports/reports';
import ClinicHistory from '../../ClinicHistory/RecordsList/RecordsList';


class PatientProfile extends Component {
  state = {
    loading: true,

    //Mock data
    patient: {
      name: "Franco",
      lastname: "Borrelli",
      documentType: "DNI",
      documentNumber: "39831178",
      age: "5 meses",
      visits: "53",
      birthday: "27/08/1996",
      gender: "Másculino",
      adress: "11 1419, La Plata, Buenos Aires",
      houseType: "Choza",
      waterType: "Pozo",
      heatType: "Estufa"
    }
  }

  componentDidMount = () => {
  }

  render() {
    return (
      <Section patient={this.state.patient}>
      <Row>
          <Col xl={9} xxl={7} style={{paddingBottom: 10}}>
            <PatientCard patient={this.state.patient}/>
          </Col>
          <Col xl={15} xxl={17} style={{paddingBottom: 10}}>
            <ClinicHistory patient={this.state.patient}/>
          </Col>
          <Col xl={15} xxl={17}>
            <Reports patient={this.state.patient}/>
          </Col>
        </Row>
    </Section>
    )
  }
}

export default PatientProfile
