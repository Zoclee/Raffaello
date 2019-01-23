(function () {
    var Rafaello = {};

    // ***** BarChart ********************

    Rafaello.BarChart = function (width, height, chartData) {
        var chart = '';
        var attr = JSON.parse('{}');
        var points = 0;
        var i = 0;
        var max = 0;

        chart = '<svg ';
        chart = (((chart + " width=\"") + width) + "\"");
        chart = (((chart + " height=\"") + height) + "\"");
        chart = (chart + " xmlns=\"http://www.w3.org/2000/svg\">");

        points = Object.keys(chartData['datasets'][0]['data']).length;

        // configure styling attributes


        attr['width'] = parseInt(Math.floor((width - ((points - 1) * 3)) / points));
        attr['fill'] = '#cc0000';
        attr['stroke'] = '#00cc00';
        attr['stroke-width'] = 1;

        // determine maximum height


        max = chartData['datasets'][0]['data'][0];
        i = 1;
        while ((i < points)) {
            if ((chartData['datasets'][0]['data'][i] > max)) {
                max = chartData['datasets'][0]['data'][i];
            }
            i = (i + 1);
        }

        // create bars

        i = 0;
        while ((i < points)) {
            attr['x'] = ((attr['width'] * i) + (3 * i));
            attr['height'] = (Math.round((height * (chartData['datasets'][0]['data'][i] / max)) * Math.pow(10, 0)) / Math.pow(10, 0));
            attr['y'] = (height - attr['height']);
            chart = (chart + Rafaello.rafBuildElement('rect', attr));
            i = (i + 1);
        }

        chart = (chart + "</svg>");

        return chart;
    }

    // ***** rafBuildElement ********************

    Rafaello.rafBuildElement = function (name, attributes) {
        var element = '';
        var i = 0;

        element = ("<" + name);
        i = 0;
        while ((i < Object.keys(attributes).length)) {
            element = (((((element + " ") + Object.keys(attributes)[i]) + "=\"") + attributes[Object.keys(attributes)[i]]) + "\"");
            i = (i + 1);
        }
        element = (element + " />");

        return element;
    }

    window.Rafaello = Rafaello;
}());
