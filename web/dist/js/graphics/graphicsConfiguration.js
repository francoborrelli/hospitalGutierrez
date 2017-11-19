
// Pone mensajes de Highchart en español

Highcharts.setOptions({
    lang: {
        decimalPoint:',',
        downloadJPEG: 'Descargar como JPEG',
        downloadPDF: 'Descargar como PDF',
        downloadPNG: 'Descargar como PNG',
        downloadSVG: 'Descargar como SVG',
        downloadXLS: 'Descargar como XLS',
        loading:'Cargando...',
        noData:'No hay datos para mostrar',
        printChart: 'Imprimir Gráfico',
        resetZoom: 'Sacar Zoom',
        resetZoomTitle: 'Sacar Zoom',
        contextButtonTitle: 'Menú de opciones de descarga'
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 550
            },
            chartOptions:{
            chart: {
                spacingLeft: 0,
                spacingRight: 10,
                height: 300,
            },              
        }}]
    },
    chart: {
        backgroundColor: '#fafafa',
        type: 'line',
        renderTo: 'chart',
        spacingLeft: 50,
        spacingRight: 50,
        defaultSeriesType: 'areaspline',
        zoomType: 'x',
        height: 400,
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
});

// Deshabilita la opción print

var theExportOptions = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
theExportOptions.splice(0, 2);
