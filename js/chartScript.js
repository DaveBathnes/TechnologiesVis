$(function () {

    // Load in the data.json file


    // Transform each item into the formats we require.

    // Create the chart
    $('#chtTechnologies').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Technologies'
        },
        subtitle: {
            text: 'Click the slices to view technologies per category.'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    //format: '{point.name}: {point.y:.1f}%'
                }
            }
        },
        tooltip: {
            //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        series: [{
            name: "Technologies",
            colorByPoint: true,
            data: [
                {
                    name: "adopt",
                    y: 100,
                    drilldown: "adopt"
                },
                {
                    name: "trial",
                    y: 100,
                    drilldown: null
                }
            ]
        }],
        drilldown: {
            series: [{
                name: "adopt",
                id: "adopt",
                data: [
                    ["spark", 1],
                    ["other", 2],
                    ["third", 3]
                ]
            }]
        }
    });
});