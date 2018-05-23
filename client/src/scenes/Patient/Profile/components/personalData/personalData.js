import React from 'react';
import {Row, Card} from "antd"
import Element from './dataElement';
import Dropdown from './dropdown';

const data = (patient) => [
  {title: "Fecha de Nacimiento", data: patient.birthday.format("DD/MM/YYYY") },
  {title: "Género", data: patient.gender ? "Masculino" : "Femenino" },
  {title: "Teléfono", data: patient.phone || "-" },
  {title: "Obra Social", data: patient.insurence || "-" },
  {title: "Dirección", data: patient.address, sm: 24 },
  {title: "Tipo de Vivienda", data: patient.houseTypes },
  {title: "Tipo de Calefacción", data: patient.heatTypes },
  {title: "Tipo de Agua", data: patient.waterTypes },
  {title: "¿Heladera?", data: patient.fridge ? 'Si' : 'No' },
  {title: "¿Mascotas?", data: patient.pets ? 'Si' : 'No' },
  {title: "¿Electricidad?", data: patient.electricity ? 'Si' : 'No' },
]

const patientCard = props => {
  const dropdown = <Dropdown/>

  const elements = data(props.patient)
  .map((element, index) => (
    <Element
    key={index}
    sm={element.sm || 12 }
    title={element.title}
    data={element.data}/>
  )
  )

  return(
    <Card title="Datos" extra={dropdown}>
      <div style={{paddingTop: 10}} >
        <Row gutter={10} style={{padding: "0px 10px 0"}}>
          {elements}
        </Row>
      </div>
    </Card>
  )
}


export default patientCard
