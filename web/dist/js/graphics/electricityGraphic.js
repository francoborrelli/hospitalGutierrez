yesElectricity = (electricity * 100) / total;

// Build the chart
Highcharts.chart('electricityGraphic', {
    title: {
        text: '¿Tiene Electricidad?'
    },
    exporting: {
        filename: ('Reporte Electricidad  ' + today)
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Porcentaje',
        colorByPoint: true,
        data: [{
            name: 'SI',
            y: yesElectricity
        }, {
            name: 'NO',
            y: (100 - yesElectricity),
        }]
    }]
});