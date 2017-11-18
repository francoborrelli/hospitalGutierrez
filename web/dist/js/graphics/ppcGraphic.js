var patient = 'patientName'

Highcharts.chart('ppcGraphic', {
    chart: {
        backgroundColor: '#fafafa',
        type: 'line',
        renderTo: 'chart',
        spacingLeft: 40,
        width: 700,
        defaultSeriesType: 'areaspline',
        zoomType: 'x',
    },
    title: {
        text: 'Curva de percentil perímetro cefálico'
    },
    xAxis: {
        min: 0,
        categories: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
        title: {
            text: 'Edad (semanas)'
        }
    },
    yAxis: {
        title: {
            text: 'Perímetro cefálico (cm)'
        }
    },
    exporting: {
        filename: (patient + " - PPC")
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'P3',
        data: [31.7, 32.4, 33.1, 33.7, 34.2, 34.6, 35.0, 35.4, 35.7, 36.1, 36.4, 36.7, 36.9, 37.2],
        visible: false
    }, {
        name: 'P15',
        data: [32.7, 33.3, 34.0, 34.6, 35.2, 35.6, 36.0, 36.4, 36.8, 37.1, 37.4, 37.7, 38.0, 38.2],
        visible: false
    }, {
        name: 'P50',
        data: [33.8, 34.6, 35.2, 35.8, 36.4, 36.8, 37.3, 37.7, 38.0, 38.4, 38.7, 39.0, 39.3, 39.5],
    }, {
        name: 'P85',
        data: [35.1, 35.8, 36.4, 37.0, 37.6, 38.1, 38.5, 38.9, 39.3, 39.6, 39.9, 40.2, 40.5, 40.8],
        visible: false
    }, {
        name: 'P97',
        data: [36.1, 36.7, 37.4, 38.0, 38.6, 39.1, 39.5, 39.9, 40.3, 40.6, 41.0, 41.3, 41.6, 41.9],
        visible: false
    }]
});


