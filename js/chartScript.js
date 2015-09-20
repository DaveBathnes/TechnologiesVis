$(function () {

    // Load in the data.json file (asynchronous)
    $.getJSON("js/data.json", function (json) {

        // For the benefit of the highchart setup, we need to get the data into the right formats

        // Create an array of the top level categories
        var topLevelCategories = [];
        // And an array for the drill down data
        var drilldown = [];

        // For each by default will give us the top level properties - construct a name and cout of technologies.
        $.each(json, function (key, item) {
            topLevelCategories.push({ name: key, y: Object.keys(item).length, description: Object.keys(item).length, drilldown: key });

            var drilldownData = [];
            // Then we need each technology for the drill down data.
            $.each(item, function (ddKey, ddItem) {
                drilldownData.push({ name: ddKey, y: 1, description: ddItem.description, links: ddItem.links, flag: ddItem.flag });
            });
            drilldown.push({
                name: key, id: key, data: drilldownData, point: {
                    events: {
                        click: function () {
                            $('#hdrTechnology').empty();
                            $('#pDescription').empty();
                            $('#lblFlag').empty();
                            $('#lstLinks').empty();

                            if (this.name) $('#hdrTechnology').text(this.name);
                            if (this.description) $('#pDescription').html(this.description);
                            if (this.flag) $('#lblFlag').text(this.flag);

                            if (this.links) {
                                $.each(this.links, function (key, link) {
                                    var linkText = key;
                                    var link = link;
                                    var linkHtml = '<a class="list-group-item" href="' + link + '" target="_blank"><h4 class="list-group-item-heading">' + linkText + '</h4><p class="list-group-item-text">' + link + '</p></a>';
                                    $('#lstLinks').append(linkHtml);
                                });
                            }

                            $('#mdlDetails').modal({
                                keyboard: false
                            })
                        }
                    }
                }
            });
        });

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
                        format: '{point.name} {point.flag}'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name} {point.y}</span><br/>'
            },
            series: [{
                name: "Technologies",
                colorByPoint: true,
                data: topLevelCategories
            }],
            drilldown: {
                series: drilldown
            },
            credits: {
                enabled: false
            }
        });
    });
});