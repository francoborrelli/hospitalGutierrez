yesPet = (pet * 100) / total;

// Build the chart
Highcharts.chart('petGraphic', {
    title: {
        text: '¿Tiene Mascota?'
    },
    exporting: {
        filename: ('Reporte Mascotas  ' + today)
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Porcentaje',
        colorByPoint: true,
        data: [{
            name: 'SI',
            y: yesPet
        }, {
            name: 'NO',
            y: (100 - yesPet),
        }]
    }]
});