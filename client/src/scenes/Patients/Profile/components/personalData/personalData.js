import React from 'react';
import {Row, Card} from "antd"
import Element from './dataElement';
import Dropdown from './dropdown';

const patientCard = props => {
  const dropdown = <Dropdown/>

  return(
    <Card title="Datos" extra={dropdown}>
      <div style={{paddingTop: 10}} >
        <Row gutter={10} style={{padding: "0px 10px 0"}}>
          <Element sm={12} title="Fecha de Nacimiento" data={props.patient.birthday}/>
          <Element sm={12} title="Género" data={props.patient.gender}/>
          <Element sm={12} title="Teléfono" data={props.patient.phone || "-"}/>
          <Element sm={12} title="Obra Social" data={props.patient.phone || "-"}/>
          <Element sm={24} title="Dirección" data={props.patient.adress}/>
          <Element sm={12} title="Tipo de Vivienda" data={props.patient.houseType}/>
          <Element sm={12} title="Tipo de Calefacción" data={props.patient.heatType}/>
          <Element sm={12} title="Tipo de Agua" data={props.patient.waterType}/>
          <Element sm={12} title="¿Heladera?" data={props.patient.fridge ? 'Si' : 'No'}/>
          <Element sm={12} title="¿Mascotas?" data={props.patient.pets ? 'Si' : 'No'}/>
          <Element sm={12} title="¿Electricidad?" data={props.patient.electricity ? 'Si' : 'No'}/>
        </Row>
      </div>
    </Card>
  )
}


export default patientCard
