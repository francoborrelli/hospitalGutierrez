import React from "react";
import {Card} from "antd"
import moment from 'moment';

import Highcharts from 'highcharts';
import {
  withHighcharts,
  Chart,
  Title,
  Subtitle,
  Legend,
  XAxis,
  YAxis,
  HighchartsChart,
  Tooltip
} from 'react-jsx-highcharts';
import applyExporting from 'highcharts/modules/exporting';
import applyOffline from 'highcharts/modules/offline-exporting';

applyExporting(Highcharts);
applyOffline(Highcharts);

const lang = {
  decimalPoint: ',',
  downloadJPEG: 'Descargar como JPEG',
  downloadPDF: 'Descargar como PDF',
  downloadPNG: 'Descargar como PNG',
  downloadSVG: 'Descargar como SVG',
  downloadXLS: 'Descargar como XLS',
  loading: 'Cargando...',
  noData: 'No hay datos para mostrar',
  printChart: 'Imprimir Gráfico',
  resetZoom: 'Sacar Zoom',
  resetZoomTitle: 'Sacar Zoom',
  contextButtonTitle: 'Menú de opciones de descarga'
}

const pieColors = () => {
  let colors = []
  let base = Highcharts
    .getOptions()
    .colors[0]
  for (let i = 0; i < 10; i += 1) {
    colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
  }
  return colors;
};

const plotOptions = {
  series: {
    marker: {
      symbol: 'circle'
    },
    connectNulls: false,
    lineWidth: 1
  },
  line: {
    dataLabels: {
      enabled: true
    },
    enableMouseTracking: true
  },
  column: {
    dataLabels: {
      enabled: true
    },
    enableMouseTracking: true
  },
  pie: {
    allowPointSelect: true,
    cursor: 'pointer',
    colors: pieColors(),
    dataLabels: {
      enabled: true,
      distance: -50,
      format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
      filter: {
        property: 'percentage',
        operator: '>',
        value: 4
      }
    },
    showInLegend: true
  }
}

const formatter = function() {
  return '<br><span style="color:'
  + this.series.color
  + '">\u25CF</span> '
  + 'Cantidad: '
  + this.y.toFixed(0)
}

const highchart = props => {

  let exporting = props.exporting || {
    filename: 'chart'
  }
  let today = moment().format('DD/MM/YYYY');
  exporting = {
    filename: exporting.filename + ' - ' + today
  }

  return (
    <Card style={{
      marginBottom: 10,
      minHeight: 300
    }}>
      <HighchartsChart plotOptions={plotOptions} exporting={exporting} lang={lang}>
        <Chart zoomType="xy"/>

        <Title>{props.title}</Title>
        <Subtitle>{props.subtitle}</Subtitle>
        <Legend/>

        <XAxis>
          <XAxis.Title>{props.xTitle}</XAxis.Title>
        </XAxis>

        <YAxis id="number">
          <YAxis.Title>{props.yTitle}</YAxis.Title>
          {props.children}
        </YAxis>
        <Tooltip formatter={formatter}></Tooltip>
      </HighchartsChart>
    </Card>
  )
}

export default withHighcharts(highchart, Highcharts)
