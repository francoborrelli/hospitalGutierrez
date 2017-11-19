Highcharts.setOptions({
    chart: {
        type: 'line',
        zoomType: 'x',
    },
    plotOptions: {
        series:{
            connectNulls: true,
            lineWidth: 1,
            events: {
                legendItemClick: function(event) {
                    var seriesIndex = this.index;
                    if (seriesIndex == 0){
                        event.preventDefault();
                    }else{
                        return
                    }
                }
            }
        },
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    exporting: {
        chartOptions: {
            subtitle: {
                text: patient,
            }
        }
    }
});
