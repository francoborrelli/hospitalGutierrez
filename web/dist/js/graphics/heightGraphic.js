if (gender == "Masculino"){
    var dataHeight = []
}else{
    var dataHeight = [{
        name: 'P3',
        data: [45.6, 50.0, 53.2, 55.8, 58.0, 59.9, 61.5, 62.9, 64.3, 65.6, 66.8, 68.0, 69.2, 70.3, 71.3, 72.4, 73.3, 74.3, 75.2, 76.2, 77.0, 77.9, 78.7, 79.6, 80.3],
        visible: false,
    }, {
        name: 'P15',
        data: [47.2, 51.7, 55.0, 57.6, 59.8, 61.7, 63.4, 64.9, 66.3, 67.6, 68.9, 70.2, 71.3, 72.5, 73.6, 74.7, 75.7, 76.7, 77.7, 78.7, 79.6, 80.5, 81.4, 82.2, 83.1],
        visible: false
    }, {
        name: 'P50',
        data: [49.1, 53.7, 57.1, 59.8, 62.1, 64.0, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74.0, 75.2, 76.4, 77.5, 78.6, 79.7, 80.7, 81.7, 82.7, 83.7, 84.6, 85.5, 86.4],
    }, {
        name: 'P85',
        data: [51.1, 55.7, 59.2, 62.0, 64.3, 66.3, 68.1, 69.7, 71.2, 72.6, 74.0, 75.4, 76.7, 77.9, 79.2, 80.3, 81.5, 82.6, 83.7, 84.8, 85.8, 86.8, 87.8, 88.8, 89.8],
        visible: false
    }, {
        name: 'P97',
        data: [52.7, 57.4, 60.9, 63.8, 66.2, 68.2, 70.0, 71.6, 73.2, 74.7, 76.1, 77.5, 78.9, 80.2, 81.4, 82.7, 83.9, 85.0, 86.2, 87.3, 88.4, 89.4, 90.5, 91.5, 92.5],
        visible: false
    }]
}

Highcharts.chart('heightGraphic', {
    chart: {
        backgroundColor: '#fafafa',
        type: 'line',
        renderTo: 'chart',
        spacingRight: 10,
        spacingLeft: 40,
        width: 700,
        defaultSeriesType: 'areaspline',
        zoomType: 'x',
    },
    title: {
        text: ('Curva de Talla ' + gender)
    },
    xAxis: {
        min: 0,
        categories: [0,1,2,3,4,5,6,7,8,9,10,11,12,13, 14, 15,16,17,18,19,20,21,22,23,24],
        title: {
            text: 'Edad (meses)'
        },
    },
    yAxis: {
        title: {
            text: 'Longitud (cm)'
        }
    },
    exporting: {
        filename:(patient + ' - Curva de Talla') 
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: dataHeight,
});



