
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
        resetZoomTitle: 'Sacar Zoom'
    },
    chart: {
        backgroundColor: '#fafafa',
        type: 'line',
        renderTo: 'chart',
        spacingLeft: 40,
        width: 700,
        defaultSeriesType: 'areaspline',
        zoomType: 'x',
    },
    plotOptions: {
        series:{
            connectNulls: true,
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
