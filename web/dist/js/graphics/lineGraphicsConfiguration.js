Highcharts.setOptions({
    chart: {
        type: 'line',
        zoomType: 'xy',
    },
    plotOptions: {
        series:{
            marker: {
                symbol:'circle',
            },
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
                enabled: false,
            },
            enableMouseTracking: true
        }
    },
    exporting: {
        chartOptions: {
            subtitle: {
                text: patient,
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        style: {
                            fontSize: '5px',
                        },
                        enabled: true
                    }
                }
            }
        }
    }
});
