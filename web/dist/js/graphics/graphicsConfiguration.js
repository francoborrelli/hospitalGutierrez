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
    credits: {
        enabled: false
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
        backgroundColor: '#FFFFFF',
        renderTo: 'chart',
        spacingLeft: 50,
        spacingRight: 50,
        defaultSeriesType: 'areaspline',
        height: 400,
    },
});

// Deshabilita la opción print

var theExportOptions = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
theExportOptions.splice(0, 2);


// Fix responsiveness

// Reports responsiveness

$('.card a.nav-link').click(function(){
    $('a.nav-link').each(function(){
        $(this).removeClass('active');
    })
    $(this).addClass('active');
    href = $(this).attr('href');
    $('.tab-pane').each(function(){
        $(this).removeClass('show active');
    })
    $(href).addClass('show active');
    window.dispatchEvent(new Event('resize'));
    oTable.columns.adjust().draw();
})
