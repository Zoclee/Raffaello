(function () {
    var Rafaello = {};

    // Generate BarChart from data
    Rafaello.BarChart = function (width, height, data) {
        var chart = '';
        var attr = JSON.parse('{}');

        chart = '<svg ';
        chart = (((chart + " width=\"") + width) + "\"");
        chart = (((chart + " height=\"") + height) + "\"");
        chart = (chart + " xmlns=\"http://www.w3.org/2000/svg\">");

        attr['x'] = 10;
        attr['y'] = 10;
        attr['width'] = 80;
        attr['height'] = 80;
        attr['fill'] = '#cc0000';
        attr['stroke'] = '#00cc00';
        attr['stroke-width'] = 10;
        chart = (chart + Rafaello.BuildElement('rect', attr));

        chart = (chart + "</svg>");

        return chart;
    }

    // Build SVG element
    Rafaello.BuildElement = function (name, attributes) {
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
