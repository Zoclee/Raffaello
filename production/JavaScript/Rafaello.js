(function () {
    var Rafaello = {};

    // ***** BarChart ********************

    Rafaello.BarChart = function (width, height, chartData) {
        var chart = '';
        var attr = JSON.parse('{}');
        var points = 0;
        var i = 0;
        var max = 0;
        var scaleMargin = 0;
        var maxScaleLen = 0;
        var barsOffset = 0;
        var scaleOffset = 0;
        var yAxisOffset = 0;
        var dataSet = JSON.parse('{}');
        var position = 'left';

        dataSet = chartData['datasets'][0];

        if (chartData.hasOwnProperty('options')) {
            if (chartData['options'].hasOwnProperty('yaxis')) {
                if (chartData['options']['yaxis'].hasOwnProperty('position')) {
                    position = (chartData['options']['yaxis']['position']).toLowerCase();
                }
            }
        }

        chart = '<svg ';
        chart = (((chart + " width=\"") + width) + "\"");
        chart = (((chart + " height=\"") + height) + "\"");
        chart = (chart + " xmlns=\"http://www.w3.org/2000/svg\">");

        points = Object.keys(dataSet['data']).length;

        // determine scale margin

        maxScaleLen = 9;
        scaleMargin = (maxScaleLen * 9);

        if ((position == 'right')) {
            barsOffset = 0;
            yAxisOffset = ((width - scaleMargin) + 5);
            scaleOffset = (yAxisOffset + 5);
        } else {
            barsOffset = scaleMargin;
            yAxisOffset = (barsOffset - 5);
            scaleOffset = 0;
        }

        // determine maximum height

        max = dataSet['data'][0];
        i = 1;
        while ((i < points)) {
            if ((dataSet['data'][i] > max)) {
                max = dataSet['data'][i];
            }
            i = (i + 1);
        }

        // y-axis

        attr = JSON.parse('{}');
        attr['x1'] = yAxisOffset;
        attr['y1'] = 0;
        attr['x2'] = yAxisOffset;
        attr['y2'] = height;
        attr['stroke'] = '#000000';
        attr['stroke-width'] = 1;
        chart = (chart + Rafaello.rafBuildElement('line', attr, ''));

        // scale values

        attr = JSON.parse('{}');
        attr['x'] = scaleOffset;
        attr['y'] = 100;
        attr['fill'] = '#000000';
        chart = (chart + Rafaello.rafBuildElement('text', attr, 'Test12345'));

        // configure styling attributes

        attr = JSON.parse('{}');
        attr['width'] = parseInt(Math.floor(((width - ((points - 1) * 5)) - scaleMargin) / points));
        attr['fill'] = '#00cc00';
        attr['fill-opacity'] = 0.75;
        attr['stroke'] = '#004000';
        attr['stroke-opacity'] = 0.75;
        attr['stroke-width'] = 1;

        // create bars

        i = 0;
        while ((i < points)) {
            attr['x'] = ((barsOffset + (attr['width'] * i)) + (5 * i));
            attr['height'] = (Math.round((height * (dataSet['data'][i] / max)) * Math.pow(10, 0)) / Math.pow(10, 0));
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
