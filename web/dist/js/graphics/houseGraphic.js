var houseData = [];

house.forEach(function(element) {
    porcentaje = (element['data'] * 100) / total;
    houseData.push({name: element['name'], y: porcentaje},)
});

// Build the chart
Highcharts.chart('houseGraphic', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Tipos de Vivienda'
    },
    exporting: {
        filename: ('Reporte Tipo de Vivienda  ' + today)
    },
    series: [{
        name: 'Porcentaje',
        colorByPoint: true,
        data: houseData,
    }]
});