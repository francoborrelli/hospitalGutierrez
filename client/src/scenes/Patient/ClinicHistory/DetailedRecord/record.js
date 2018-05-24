import React from 'react';
import {Row, Card} from "antd"
import Element from "../../Profile/components/personalData/dataElement"
import Dropdown from "./components/dropdown"

const data = (record) => [
  {
    title: "Usuario",
    data: record.user,
    sm: 24
  }, {
    title: "Peso",
    data: record.weight + " kg"
  }, {
    title: "Altura",
    data: record.height + " cm" || "-"
  }, {
    title: "PC",
    data: record.pc + " cm" || "-"
  }, {
    title: "PPC",
    data: record.ppc + " cm" || "-"
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
    data: record.maduration
      ? "Si"
      : "No",
    sm: 24
  }, {
    title: "Observaciones de Maduración",
    data: record.madurationObservation || "-",
    sm: 24
  }, {
    title: "¿Examen físico normal?",
    data: record.fisicExam
      ? "Si"
      : "No",
    sm: 24
  }, {
    title: "Observaciones del Examen Físico",
    data: record.fisicExamObservation || "-",
    sm: 24
  }, {
    title: "Alimentación",
    data: record.diet || "-",
    sm: 24
  }, {
    title: "Observaciones generales",
    data: record.observations || "-",
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
    <div style={{
      padding: 10
    }}>
      <Card
        title={"Control: " + props.record.date}
        extra={< Dropdown />}
        style={{
        maxWidth: 700,
        margin: "0 auto"
      }}>
        <div style={{
          paddingTop: 10
        }}>
          <Row gutter={10} style={{
            padding: "0px 10px 0"
          }}>
            {elements}
          </Row>
        </div>
      </Card>
    </div>
  )
}

export default recordCard
