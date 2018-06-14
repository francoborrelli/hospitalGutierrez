import React from 'react'
import LineChart from '../../../../../components/charts/lineChart';

const getData = patient => {
  switch (patient.gender) {
    //MALE
    case "male":
      return (
      [{
        name: 'P3',
        color: '#FA5858',
        data: [46.3, 51.1, 54.7, 57.6, 60.0, 61.9, 63.6, 65.1, 66.5, 67.7, 69.0, 70.2, 71.3, 72.4, 73.4, 74.4, 75.4, 76.3, 77.2, 78.1, 78.9, 79.7, 80.5, 81.3, 82.1],
      }, {
        name: 'P15',
        color: '#FE9A2E',
        data: [47.9, 52.7, 56.4, 59.3, 61.7, 63.7, 65.4, 66.9, 68.3, 69.6, 70.9, 72.1, 73.3, 74.4, 75.5, 76.5, 77.5, 78.5, 79.5, 80.4, 81.3, 82.2, 83.0, 83.8, 84.6],
      }, {
        name: 'P50',
        color: '#BFFF00',
        data: [49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72.0, 73.3, 74.5, 75.7, 76.9, 78.0, 79.1, 80.2, 81.2, 82.2, 83.2, 84.2, 85.1, 86.0, 86.9, 87.8],
      }, {
        name: 'P85',
        color: '#FE9A2E',
        data: [51.8, 56.7, 60.5, 63.5, 66.0, 68.1, 69.8, 71.4, 72.9, 74.3, 75.6, 77.0, 78.2, 79.4, 80.6, 81.8, 82.9, 84.0, 85.1, 86.1, 87.1, 88.1, 89.1, 90.0, 91.0],
      }, {
        name: 'P97',
        color: '#FA5858',
        data: [53.4, 58.4, 62.2, 65.3, 67.8, 69.9, 71.6, 73.2, 74.7, 76.2, 77.6, 78.9, 80.2, 81.5, 82.7, 83.9, 85.1, 86.2, 87.3, 88.4, 89.5, 90.5, 91.6, 92.6, 93.6],
      }]
    )
    //FEMALE
    default:
      return (
        [{
          name: 'P3',
          color: '#FA5858',
          data: [45.6, 50.0, 53.2, 55.8, 58.0, 59.9, 61.5, 62.9, 64.3, 65.6, 66.8, 68.0, 69.2, 70.3, 71.3, 72.4, 73.3, 74.3, 75.2, 76.2, 77.0, 77.9, 78.7, 79.6, 80.3],
        }, {
          name: 'P15',
          color: '#FE9A2E',
          data: [47.2, 51.7, 55.0, 57.6, 59.8, 61.7, 63.4, 64.9, 66.3, 67.6, 68.9, 70.2, 71.3, 72.5, 73.6, 74.7, 75.7, 76.7, 77.7, 78.7, 79.6, 80.5, 81.4, 82.2, 83.1],
        }, {
          name: 'P50',
          color: '#BFFF00',
          data: [49.1, 53.7, 57.1, 59.8, 62.1, 64.0, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74.0, 75.2, 76.4, 77.5, 78.6, 79.7, 80.7, 81.7, 82.7, 83.7, 84.6, 85.5, 86.4],
        }, {
          name: 'P85',
          color: '#FE9A2E',
          data: [51.1, 55.7, 59.2, 62.0, 64.3, 66.3, 68.1, 69.7, 71.2, 72.6, 74.0, 75.4, 76.7, 77.9, 79.2, 80.3, 81.5, 82.6, 83.7, 84.8, 85.8, 86.8, 87.8, 88.8, 89.8],
        }, {
          name: 'P97',
          color: '#FA5858',
          data: [52.7, 57.4, 60.9, 63.8, 66.2, 68.2, 70.0, 71.6, 73.2, 74.7, 76.1, 77.5, 78.9, 80.2, 81.4, 82.7, 83.9, 85.0, 86.2, 87.3, 88.4, 89.4, 90.5, 91.5, 92.5],
        }]
      )
  }

}

export default props => {

  const data = getData(props.patient)
  
  data.push({name: props.patient.firstName, data: props.data})

  const config = {
    type: "Mes",
    title: "Curva de talla " + (props.patient.gender === "male" ? "Masculina" : "Femenino"),
    xTitle: "Edad (meses)",
    yTitle: "Longitud (cm)",
    series: data,
    exporting: {filename: props.patient.name + " " + props.patient.lastname + " - Curva de Talla"}
  }

  return (<div style={{padding: "0px 20px"}}><LineChart {...config}/></div>)
}
