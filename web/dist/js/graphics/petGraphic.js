yesPet = (pet * 100) / total;

// Build the chart
Highcharts.chart('petGraphic', {
    title: {
        text: '¿Tiene Mascota?'
    },
    exporting: {
        filename: ('Reporte Mascotas  ' + today)
    },
    series: [{
        name: 'Porcentaje',
        colorByPoint: true,
        data: [{
            name: 'Si',
            y: yesPet
        }, {
            name: 'No',
            y: (100 - yesPet),
        }]
    }]
});