if (gender == "Masculino"){
    //Masculino
    var dataWeight = [{
        name: 'P3',
        data: [2.5, 2.6, 2.8, 3.1, 3.4, 3.6, 3.8, 4.1, 4.3, 4.4, 4.6, 4.8, 4.9, 5.1],
        visible: false
    }, {
        name: 'P15',
        data: [2.9, 3.0, 3.2, 3.5, 3.8, 4.1, 4.3, 4.5, 4.7, 4.9, 5.1, 5.3, 5.5, 5.6],
        visible: false
    }, {
        name: 'P50',
        data: [3.3, 3.5, 3.8, 4.1, 4.4, 4.7, 4.9, 5.2, 5.4, 5.6, 5.8, 6.0, 6.2, 6.4],
    }, {
        name: 'P85',
        data: [3.9, 4.0, 4.3, 4.7, 5.0, 5.3, 5.6, 5.9, 6.2, 6.4, 6.6, 6.8, 7.0, 7.2],
        visible: false
    }, {
        name: 'P97',
        data: [4.3, 4.5, 4.9, 5.2, 5.6, 5.9, 6.3, 6.5, 6.8, 7.1, 7.3, 7.5, 7.7, 7.9],
        visible: false
    }, {
        name: 'Patient',
        data: graphsData['weight'],
        visible: true
    }]
}else{
    //Femenino
    var dataWeight = [{
        name: 'P3',
        data: [2.4, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7, 3.9, 4.1, 4.2, 4.3, 4.5, 4.6],
        visible: false
    }, {
        name: 'P15',
        data: [2.8, 2.9, 3.1, 3.3, 3.5, 3.8, 4.0, 4.2, 4.4, 4.5, 4.7, 4.8, 5.0, 5.1],
        visible: false
    }, {
        name: 'P50',
        data: [3.2, 3.3, 3.6, 3.8, 4.1, 4.3, 4.6, 4.8, 5.0, 5.2, 5.4, 5.5, 5.7, 5.8],
    }, {
        name: 'P85',
        data: [3.7, 3.9, 4.1, 4.4, 4.7, 5.0, 5.3, 5.5, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7],
        visible: false
    }, {
        name: 'P97',
        data: [4.2, 4.4, 4.6, 5.0, 5.3, 5.6, 5.9, 6.1, 6.4, 6.6, 6.8, 7.0, 7.2, 7.4],
        visible: false
    }, {
        name: 'Patient',
        data: graphsData['weight'],
        visible: true
    }]
}

Highcharts.chart('weightGraphic', {
    title: {
        text: ('Curva de Crecimiento ' + gender)
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
            text: 'Peso (kg)'
        }
    },
    exporting: {
        filename:(patient + ' - Curva de Crecimiento') 
    },
    series: dataWeight
});


