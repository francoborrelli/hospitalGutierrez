import React from 'react'
import LineChart from '../../../../../components/charts/lineChart';

const getData = (patient, data) => {
  switch (patient.gender) {
    //MALE
    case "male":
      return (
        [{
          name: 'P3',
          color: '#FA5858',
          data: [32.1, 32.9, 33.7, 34.3, 34.9, 35.4, 35.9, 36.3, 36.7, 37.0, 37.4, 37.7, 38.0, 38.3],
        }, {
          name: 'P15',
          color: '#FE9A2E',
          data: [33.1, 33.9, 34.7, 35.3, 35.9, 36.4, 36.8, 37.3, 37.7, 38.0, 38.4, 38.7, 39.0, 39.3],
        }, {
          name: 'P50',
          color: '#BFFF00',
          data: [34.5, 35.2, 35.9, 36.5, 37.1, 37.6, 38.1, 38.5, 38.9, 39.2, 39.6, 39.9, 40.2, 40.5],
        }, {
          name: 'P85',
          color: '#FE9A2E',
          data: [35.8, 36.4, 37.1, 37.7, 38.3, 38.8, 39.3, 39.7, 40.1, 40.5, 40.8, 41.1, 41.4, 41.7],
        }, {
          name: 'P97',
          color: '#FA5858',
          data: [36.6, 37.5, 38.1, 38.7, 39.3, 39.8, 40.3, 40.7, 41.2, 41.4, 41.8, 42.1, 42.4, 42.7],
        }]
    )
    //FEMALE
    default:
      return (
        [{
          name: 'P3',
          color: '#FA5858',
          data: [31.7, 32.4, 33.1, 33.7, 34.2, 34.6, 35.0, 35.4, 35.7, 36.1, 36.4, 36.7, 36.9, 37.2],
        }, {
          name: 'P15',
          color: '#FE9A2E',
          data: [32.7, 33.3, 34.0, 34.6, 35.2, 35.6, 36.0, 36.4, 36.8, 37.1, 37.4, 37.7, 38.0, 38.2],
        }, {
          name: 'P50',
          color: '#BFFF00',
          data: [33.8, 34.6, 35.2, 35.8, 36.4, 36.8, 37.3, 37.7, 38.0, 38.4, 38.7, 39.0, 39.3, 39.5],
        }, {
          name: 'P85',
          color: '#FE9A2E',
          data: [35.1, 35.8, 36.4, 37.0, 37.6, 38.1, 38.5, 38.9, 39.3, 39.6, 39.9, 40.2, 40.5, 40.8],
        }, {
          name: 'P97',
          color: '#FA5858',
          data: [36.1, 36.7, 37.4, 38.0, 38.6, 39.1, 39.5, 39.9, 40.3, 40.6, 41.0, 41.3, 41.6, 41.9],
        }]
      )
  }
}

export default props => {

  const data = getData(props.patient);

  data.push({name: props.patient.firstName, data: props.data})
  
  const config = {
    type: "Semana",
    title: "Curva de percentil perímetro cefálico",
    xTitle: "Edad (semanas)",
    yTitle: "Perímetro cefálico (cm)",
    series: data,
    exporting: {filename: props.patient.name + " " + props.patient.lastname + " - PPC"}
  }

  return (<div style={{padding: "0px 20px"}}><LineChart {...config}/></div>)
}
