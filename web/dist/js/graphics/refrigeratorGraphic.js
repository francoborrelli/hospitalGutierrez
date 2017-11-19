yesRefrigerator = (refrigerator * 100) / total;

// Build the chart
Highcharts.chart('refrigeratorGraphic', {
    title: {
        text: '¿Tiene Heladera?'
    },
    exporting: {
        filename: ('Reporte Heladera  ' + today)
    },
    series: [{
        name: 'Porcentaje',
        colorByPoint: true,
        data: [{
            name: 'SI',
            y: yesRefrigerator
        }, {
            name: 'NO',
            y: (100 - yesRefrigerator),
        }]
    }]
});