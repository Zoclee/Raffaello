(function () {
    var Rafaello = {};

    // ***** BarChart ********************

    Rafaello.BarChart = function (width, height, chartData) {
        var chart = '';
        var attr = JSON.parse('{}');
        var points = 0;
        var i = 0;
        var max = 0;
        var yScaleMargin = 0;
        var maxScaleLen = 0;

        chart = '<svg ';
        chart = (((chart + " width=\"") + width) + "\"");
        chart = (((chart + " height=\"") + height) + "\"");
        chart = (chart + " xmlns=\"http://www.w3.org/2000/svg\">");

        points = Object.keys(chartData['datasets'][0]['data']).length;

        // determine scale margins

        maxScaleLen = 9;
        yScaleMargin = (maxScaleLen * 9);

        // determine maximum height

        max = chartData['datasets'][0]['data'][0];
        i = 1;
        while ((i < points)) {
            if ((chartData['datasets'][0]['data'][i] > max)) {
                max = chartData['datasets'][0]['data'][i];
            }
            i = (i + 1);
        }

        // y-axis

        attr = JSON.parse('{}');
        attr['x1'] = ((width - yScaleMargin) + 5);
        attr['y1'] = 0;
        attr['x2'] = ((width - yScaleMargin) + 5);
        attr['y2'] = height;
        attr['stroke'] = '#000000';
        attr['stroke-width'] = 1;
        chart = (chart + Rafaello.rafBuildElement('line', attr, ''));

        // scale values

        attr = JSON.parse('{}');
        attr['x'] = ((width - yScaleMargin) + 10);
        attr['y'] = 100;
        attr['fill'] = '#000000';
        chart = (chart + Rafaello.rafBuildElement('text', attr, 'Test12345'));

        // configure styling attributes

        attr = JSON.parse('{}');
        attr['width'] = parseInt(Math.floor(((width - ((points - 1) * 5)) - yScaleMargin) / points));
        attr['fill'] = '#00cc00';
        attr['fill-opacity'] = 0.75;
        attr['stroke'] = '#004000';
        attr['stroke-opacity'] = 0.75;
        attr['stroke-width'] = 1;

        // create bars

        i = 0;
        while ((i < points)) {
            attr['x'] = ((attr['width'] * i) + (5 * i));
            attr['height'] = (Math.round((height * (chartData['datasets'][0]['data'][i] / max)) * Math.pow(10, 0)) / Math.pow(10, 0));
            attr['y'] = (height - attr['height']);
            chart = (chart + Rafaello.rafBuildElement('rect', attr, ''));
            i = (i + 1);
        }

        chart = (chart + "</svg>");

        return chart;
    }

    // ***** rafBuildElement ********************

    Rafaello.rafBuildElement = function (name, attributes, content) {
        var element = '';
        var i = 0;

        element = ("<" + name);
        i = 0;
        while ((i < Object.keys(attributes).length)) {
            element = (((((element + " ") + Object.keys(attributes)[i]) + "=\"") + attributes[Object.keys(attributes)[i]]) + "\"");
            i = (i + 1);
        }
        if ((content != "")) {
            element = (((((element + ">") + content) + "</") + name) + ">");
        } else {
            element = (element + " />");
        }


        return element;
    }

    window.Rafaello = Rafaello;
}());
