Highcharts.chart('weightGraphic', {
    chart: {
        type: 'line',
        renderTo: 'chart',
        spacingLeft: 40,
        width: 700,
        defaultSeriesType: 'areaspline'
    },
    title: {
        text: 'Curva de Crecimiento'
    },
    xAxis: {
        categories: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
        title: {
            text: 'Semana'
        }
    },
    yAxis: {
        title: {
            text: 'Peso (kg)'
        }
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
        name: 'SD3neg',
        data: [2.0, 2.1, 2.3, 2.5, 2.7, 2.9, 3.0, 3.2, 3.3, 3.5, 3.6, 3.8, 3.9, 4.0 ],
        visible: false
    }, {
        name: 'SD2neg',
        data: [2.4, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7, 3.8, 4.0, 4.1, 4.3, 4.4, 4.5 ],
        visible: false
    }, {
        name: 'SD1neg',
        data: [2.8, 2.9, 3.1, 3.3, 3.6, 3.8, 4.0, 4.2, 4.4, 4.6, 4.7, 4.9, 5.0, 5.1 ],
        visible: false
    }, {
        name: 'SD0',
        data: [3.2, 3.3, 3.6, 3.8, 4.1, 4.3, 4.6, 4.8, 5.0, 5.2, 5.4, 5.5, 5.7, 5.8 ]
    }, {
        name: 'SD1',
        data: [3.7, 3.9, 4.1, 4.4, 4.7, 5.0, 5.2, 5.5, 5.7, 5.9, 6.1, 6.3, 6.5, 6.6 ],
        visible: false
    }, {
        name: 'SD2',
        data: [4.2, 4.4, 4.7, 5.0, 5.4, 5.7, 6.0, 6.2, 6.5, 6.7, 6.9, 7.1, 7.3, 7.5 ],
        visible: false
    }, {
        name: 'SD3',
        data: [4.8, 5.1, 5.4, 5.7, 6.1, 6.5, 6.8, 7.1, 7.3, 7.6, 7.8, 8.1, 8.3, 8.5 ],
        visible: false
    }]
});


