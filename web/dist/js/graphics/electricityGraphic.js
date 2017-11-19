yesElectricity = (electricity * 100) / total;

// Build the chart
Highcharts.chart('electricityGraphic', {
    title: {
        text: '¿Tiene Electricidad?'
    },
    exporting: {
        filename: ('Reporte Electricidad  ' + today)
    },
    series: [{
        name: 'Porcentaje',
        colorByPoint: true,
        data: [{
            name: 'Si',
            y: yesElectricity
        }, {
            name: 'No',
            y: (100 - yesElectricity),
        }]
    }]
});