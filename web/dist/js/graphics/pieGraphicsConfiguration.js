// Make monochrome colors
var pieColors = (function () {
    var colors = [],
        base = Highcharts.getOptions().colors[0],
        i;

    for (i = 0; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
    }
    return colors;
}());


// Build the chart
Highcharts.setOptions({
    chart: {
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    credits: false,
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: pieColors,
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    }
});

// Get date today

var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var today = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;