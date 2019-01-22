(function () {
    var Rafaello = {};

    Rafaello.BarChart = function (width, height, data) {
        var chart = '';
        var style = JSON.parse('{}');

        chart = '<svg ';
        chart = (((chart + " width=\"") + width) + "\"");
        chart = (((chart + " height=\"") + height) + "\"");
        chart = (chart + " xmlns=\"http://www.w3.org/2000/svg\">");

        style['fill'] = '#cc0000';
        style['stroke'] = '#00cc00';
        style['stroke-width'] = '10';
        chart = (chart + Rafaello.Rectangle(10, 10, 80, 80, style));

        chart = (chart + "</svg>");

        return chart;
    }

    // Format style object as Xml attribute string
    Rafaello.FormatStyle = function (style) {
        var attrStr = '';
        var i = 0;

        i = 0;
        while ((i < Object.keys(style).length)) {
            attrStr = (((((attrStr + " ") + Object.keys(style)[i]) + "=\"") + style[Object.keys(style)[i]]) + "\"");
            i = (i + 1);
        }

        return attrStr;
    }

    // Create a rect element
    Rafaello.Rectangle = function (x, y, width, height, style) {
        var element = '';

        element = '<rect ';
        element = (((element + " x=\"") + (x).toString()) + "\"");
        element = (((element + " y=\"") + (y).toString()) + "\"");
        element = (((element + " width=\"") + (width).toString()) + "\"");
        element = (((element + " height=\"") + (height).toString()) + "\"");
        element = (element + Rafaello.FormatStyle(style));
        element = (element + " />");

        return element;
    }

    window.Rafaello = Rafaello;
}());
