import React from 'react';
import {Row, Card} from "antd"
import Element from './dataElement';
import Dropdown from './dropdown';
import moment from "moment"

const getData = (patient, user) => {
  const data = [
    {
      title: "Fecha de Nacimiento",
      data: patient.birthday ? moment(patient.birthday).format('DD/MM/YYYY') : "-"
    }, {
      title: "Género",
      data: patient.gender === "male"
        ? "Masculino"
        : "Femenino"
    }, {
      title: "Teléfono",
      data: patient.phone || "-"
    }, {
      title: "Obra Social",
      data: patient.insurance ? patient.insuranceName : "-"
    }, {
      title: "Dirección",
      data: patient.address,
      sm: 24
    }
  ]
  const demographicData = user
    .permissions
    .includes('datosDemograficos_show')
    ? [
      {
        title: "Tipo de Vivienda",
        data: patient.houseName
      }, {
        title: "Tipo de Calefacción",
        data: patient.heatingName
      }, {
        title: "Tipo de Agua",
        data: patient.waterName
      }, {
        title: "¿Heladera?",
        data: patient.hasRefrigerator
          ? 'Si'
          : 'No'
      }, {
        title: "¿Mascotas?",
        data: patient.hasPet
          ? 'Si'
          : 'No'
      }, {
        title: "¿Electricidad?",
        data: patient.hasElectricity
          ? 'Si'
          : 'No'
      }
    ]
    : []
  return data.concat(demographicData)
}

const patientCard = props => {

  const dropdown = <Dropdown
    user={props.user}
    patient={props.patient}
    onDelete={props.onDeletePatient}/>

  const elements = getData(props.patient, props.user).map((element, index) => (<Element
    key={index}
    sm={element.sm || 12}
    title={element.title}
    data={element.data}/>))

  return (
    <Card title="Datos" extra={dropdown} loading={props.loading} style={{minHeight: 500}}>
      <div style={{paddingTop: 10}}>
        <Row gutter={10} style={{padding: "0px 10px 0"}}>
          {elements}
        </Row>
      </div>
    </Card>
  )
}

export default patientCard
