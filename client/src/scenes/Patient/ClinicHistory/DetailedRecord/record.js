import React from 'react';
import {Row, Card} from "antd"
import Element from "../../Profile/components/personalData/dataElement"
import Dropdown from "./components/dropdown"
import hasPermission from '../../../../hoc/hasPermission';

import moment from "moment"

const data = (record) => [
  {
    title: "Usuario",
    data: record.user ? record.user.username : "",
    sm: 24
  }, {
    title: "Peso",
    data: record.weight + " kg"
  }, {
    title: "Altura",
    data: record.height ? record.height + " cm" : "-"
  }, {
    title: "PC",
    data: record.pc  ? record.pc + " cm" : "-"
  }, {
    title: "PPC",
    data: record.ppc ? record.ppc + " cm" : "-"
  }, {
    title: "¿Vacunación al día?",
    data: record.vaccination
      ? "Si"
      : "No",
    sm: 24
  }, {
    title: "Observaciones de Vacunación",
    data: record.vaccinationObservation || "-",
    sm: 24
  }, {
    title: "¿Maduración Acorde?",
    data: record.maturation
      ? "Si"
      : "No",
    sm: 24
  }, {
    title: "Observaciones de Maduración",
    data: record.maturationObservation || "-",
    sm: 24
  }, {
    title: "¿Examen físico normal?",
    data: record.fisicTest
      ? "Si"
      : "No",
    sm: 24
  }, {
    title: "Observaciones del Examen Físico",
    data: record.fisicTestObservation || "-",
    sm: 24
  }, {
    title: "Alimentación",
    data: record.nutrition || "-",
    sm: 24
  }, {
    title: "Observaciones generales",
    data: record.generalObservation || "-",
    sm: 24
  }
]

const recordCard = props => {

  const elements = data(props.record).map((element, index) => (<Element
    key={index}
    sm={element.sm || 12}
    title={element.title}
    data={element.data}/>))

  return (
    <div style={{padding: 10}}>
      <Card
        title={"Control: " + moment(props.record.date).format("DD/MM/YYYY")}
        extra={< Dropdown user={props.user} patient={props.patient} record={props.record} onDelete={props.onDelete}/>}
        style={{
        maxWidth: 800,
        margin: "0 auto"
      }}>
        <div style={{paddingTop: 10}}>
          <Row gutter={10} style={{padding: "0px 10px 0"}}>
            {elements}
          </Row>
        </div>
      </Card>
    </div>
  )
}

export default hasPermission(recordCard, ['control_show'])
