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
            name: 'Si',
            y: yesRefrigerator
        }, {
            name: 'No',
            y: (100 - yesRefrigerator),
        }]
    }]
});