
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
        resetZoom: 'Sacar Zoom'
    }
});

// Deshabilita la opción print

var theExportOptions = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
theExportOptions.splice(0, 2);
