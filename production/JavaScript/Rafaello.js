(function () {
    var Rafaello = {};

    // ***** BarChart ********************

    Rafaello.BarChart = function (width, height, dataset) {
        var component = '';
        var attr = JSON.parse('{}');
        var points = 0;
        var i = 0;
        var max = 0;

        points = Object.keys(dataset['data']).length;

        // determine scale margin

        /* maxScaleLen = 9
        scaleMargin = maxScaleLen * 9

        if position = "right" {
            barsOffset = 0
            yAxisOffset = width - scaleMargin + 5
            scaleOffset = yAxisOffset + 5    
        } else {
            barsOffset = scaleMargin            
            yAxisOffset = barsOffset - 5
            scaleOffset = 0
        }*/

        // determine maximum height

        max = dataset['data'][0];
        i = 1;
        while ((i < points)) {
            if ((dataset['data'][i] > max)) {
                max = dataset['data'][i];
            }
            i = (i + 1);
        }

        // y-axis

        /*attr = ParseJSON("{}")
        attr["x1"] = yAxisOffset
        attr["y1"] = 0
        attr["x2"] = yAxisOffset
        attr["y2"] = height
        attr["stroke"] = "#000000"
        attr["stroke-width"] = 1
        component = component + BuildElement("line", attr, "")

        // scale values

        attr = ParseJSON("{}")
        attr["x"] = scaleOffset
        attr["y"] = 100
        attr["fill"] = "#000000"    
        component = component + BuildElement("text", attr, "Test12345")*/

        // configure styling attributes

        attr = JSON.parse('{}');
        attr['width'] = parseInt(Math.floor((width - ((points - 1) * 5)) / points));
        attr['fill'] = '#00cc00';
        attr['fill-opacity'] = 0.75;
        attr['stroke'] = '#004000';
        attr['stroke-opacity'] = 0.75;
        attr['stroke-width'] = 1;

        // create bars

        i = 0;
        while ((i < points)) {
            attr['x'] = ((attr['width'] * i) + (5 * i));
            attr['height'] = (Math.round((height * (dataset['data'][i] / max)) * Math.pow(10, 0)) / Math.pow(10, 0));
            attr['y'] = (height - attr['height']);
            component = (component + Rafaello.BuildElement('rect', attr, ''));
            i = (i + 1);
        }

        return component;
    }

    // ***** BuildElement ********************

    Rafaello.BuildElement = function (name, attributes, content) {
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

    // ***** Render ********************

    Rafaello.Render = function (width, height, object) {
        var composition = '';
        var dataset = JSON.parse('{}');
        var i = 0;
        var componentCount = 0;
        var component = JSON.parse('{}');
        var datasetIndex = 0;

        composition = '<svg ';
        composition = (((composition + " width=\"") + width) + "\"");
        composition = (((composition + " height=\"") + height) + "\"");
        composition = (composition + " xmlns=\"http://www.w3.org/2000/svg\">");

        componentCount = Object.keys(object['components']).length;
        i = 0;
        while ((i < componentCount)) {
            component = object['components'][i];
            switch (component['type']) {
                case "barchart":
                    if (component.hasOwnProperty('dataset')) {
                        datasetIndex = component['dataset'];
                    } else {
                        datasetIndex = 0;
                    }
                    dataset = object['datasets'][datasetIndex];
                    composition = (composition + Rafaello.BarChart(width, height, dataset));
                    break;
            }

            i = (i + 1);
        }

        composition = (composition + "</svg>");

        return composition;
    }

    window.Rafaello = Rafaello;
}());
