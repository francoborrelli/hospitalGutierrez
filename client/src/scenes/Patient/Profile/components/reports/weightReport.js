import React from 'react'
import LineChart from '../../../../../components/charts/lineChart';

const getData = patient => {
  switch (patient.gender) {
    //MALE
    case "0":
      return (
        [{
          name: 'P3',
          color: '#FA5858',
          data: [2.5, 2.6, 2.8, 3.1, 3.4, 3.6, 3.8, 4.1, 4.3, 4.4, 4.6, 4.8, 4.9, 5.1],
      }, {
          name: 'P15',
          color: '#FE9A2E',
          data: [2.9, 3.0, 3.2, 3.5, 3.8, 4.1, 4.3, 4.5, 4.7, 4.9, 5.1, 5.3, 5.5, 5.6],
      }, {
          name: 'P50',
          color: '#BFFF00',
          data: [3.3, 3.5, 3.8, 4.1, 4.4, 4.7, 4.9, 5.2, 5.4, 5.6, 5.8, 6.0, 6.2, 6.4],
      }, {
          name: 'P85',
          color: '#FE9A2E',
          data: [3.9, 4.0, 4.3, 4.7, 5.0, 5.3, 5.6, 5.9, 6.2, 6.4, 6.6, 6.8, 7.0, 7.2],
      }, {
          name: 'P97',
          color: '#FA5858',
          data: [4.3, 4.5, 4.9, 5.2, 5.6, 5.9, 6.3, 6.5, 6.8, 7.1, 7.3, 7.5, 7.7, 7.9],
      }]
    )
    //FEMALE
    default:
      return (
        [{
          name: 'P3',
          color: '#FA5858',
          data: [2.4, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7, 3.9, 4.1, 4.2, 4.3, 4.5, 4.6],
      }, {
          name: 'P15',
          color: '#FE9A2E',
          data: [2.8, 2.9, 3.1, 3.3, 3.5, 3.8, 4.0, 4.2, 4.4, 4.5, 4.7, 4.8, 5.0, 5.1],
      }, {
          name: 'P50',
          color: '#BFFF00',
          data: [3.2, 3.3, 3.6, 3.8, 4.1, 4.3, 4.6, 4.8, 5.0, 5.2, 5.4, 5.5, 5.7, 5.8],
      }, {
          name: 'P85',
          color: '#FE9A2E',
          data: [3.7, 3.9, 4.1, 4.4, 4.7, 5.0, 5.3, 5.5, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7],
      }, {
          name: 'P97',
          color: '#FA5858',
          data: [4.2, 4.4, 4.6, 5.0, 5.3, 5.6, 5.9, 6.1, 6.4, 6.6, 6.8, 7.0, 7.2, 7.4],
      }]
      )
  }
}

  export default props => {

    const data = getData(props.patient)

    const config = {
      type: "Semana",
      title: "Curva de crecimiento Masculina",
      xTitle: "Edad (semanas)",
      yTitle: "Peso (kg)",
      series: data,
      exporting: {filename: props.patient.name + " " + props.patient.lastname + " - Curva de Crecimiento"}
    }

    return (<div style={{padding: "0px 20px"}}><LineChart {...config}/></div>)
  }
