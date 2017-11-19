var waterData = [];

water.forEach(function(element) {
    porcentaje = (element['data'] * 100) / total;
    waterData.push({name: element['name'], y: porcentaje},)
});


// Build the chart
Highcharts.chart('waterGraphic', {
    title: {
        text: 'Tipos de Agua'
    },
    exporting: {
        filename: ('Reporte Tipo de Agua  ' + today)
    },
    series: [{
        name: 'Porcentaje',
        colorByPoint: true,
        data: waterData
    }]
});