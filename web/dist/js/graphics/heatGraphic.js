var heatData = [];

heat.forEach(function(element) {
    porcentaje = (element['data'] * 100) / total;
    heatData.push({name: element['name'], y: porcentaje},)
});


// Build the chart
Highcharts.chart('heatGraphic', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Tipos de Calefacción'
    },
    exporting: {
        filename: ('Reporte Tipo de Calefacción  ' + today)
    },
    credits: false,
    series: [{
        name: 'Porcentaje',
        colorByPoint: true,
        data: heatData
    }]
});