(function () {
    var Rafaello = {};

    // ***** BarChart ********************

    Rafaello.BarChart = function (width, height, dataset, options) {
        var component = '';
        var attr = JSON.parse('{}');
        var points = 0;
        var i = 0;
        var max = 0;

        points = Object.keys(dataset['data']).length;

        // determine maximum height

        max = dataset['data'][0];
        i = 1;
        while ((i < points)) {
            if ((dataset['data'][i] > max)) {
                max = dataset['data'][i];
            }
            i = (i + 1);
        }

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
            attr['x'] = (((attr['width'] * i) + (5 * i)) + 0.5);
            attr['height'] = (Math.round((height * (dataset['data'][i] / max)) * Math.pow(10, 0)) / Math.pow(10, 0));
            attr['y'] = ((height - attr['height']) + 0.5);
            component = (component + Rafaello.BuildElement('rect', attr, ''));
            i = (i + 1);
        }

        return component;
    }

    // ***** Scale ********************

    Rafaello.Scale = function (width, height, dataset, options) {
        var component = '';
        var lineAttr = JSON.parse('{}');
        var textAttr = JSON.parse('{}');
        var scaleItems = [];
        var i = 0;
        var min = 0;
        var max = 0;
        var points = 0;
        var y = 0;
        var step = 0;
        var tmpStr = '';
        var scaleMargin = 0;

        points = Object.keys(dataset['data']).length;

        // determine min and max

        min = dataset['data'][0];
        max = dataset['data'][0];
        i = 1;
        while ((i < points)) {
            if ((dataset['data'][i] < min)) {
                min = dataset['data'][i];
            }
            if ((dataset['data'][i] > max)) {
                max = dataset['data'][i];
            }
            i = (i + 1);
        }

        // determine scale items

        step = parseInt(Math.floor((max - min) / 10));
        scaleItems.push(max);
        i = (max - step);
        while ((i >= min)) {
            scaleItems.push(i);
            i = (i - step);
        }

        tmpStr = (max).toString();
        scaleMargin = (tmpStr.length * 7);

        // draw vertical line

        lineAttr = JSON.parse('{}');
        lineAttr['x1'] = (scaleMargin + 10.5);
        lineAttr['y1'] = 0;
        lineAttr['x2'] = (scaleMargin + 10.5);
        lineAttr['y2'] = (height + 1);
        lineAttr['stroke'] = '#000000';
        lineAttr['stroke-width'] = 1;
        component = (component + Rafaello.BuildElement('line', lineAttr, ''));

        // draw scale items

        textAttr = JSON.parse('{}');
        textAttr['fill'] = '#000000';
        textAttr['x'] = 0;
        i = 0;
        while ((i < scaleItems.length)) {
            y = (Math.round((height - (((scaleItems[i] - min) / (max - min)) * height)) * Math.pow(10, 0)) / Math.pow(10, 0));
            lineAttr['x1'] = scaleMargin;
            lineAttr['y1'] = (y + 0.5);
            lineAttr['x2'] = (scaleMargin + 10);
            lineAttr['y2'] = (y + 0.5);
            component = (component + Rafaello.BuildElement('line', lineAttr, ''));

            textAttr['y'] = y;
            component = (component + Rafaello.BuildElement('text', textAttr, (scaleItems[i]).toString()));

            i = (i + 1);
        }

        return component;
    }

    // ===========================================================================
    //   HELPER METHODS
    // ===========================================================================

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
        var options = JSON.parse('{}');
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

            // get dataset

            if (component.hasOwnProperty('dataset')) {
                datasetIndex = component['dataset'];
            } else {
                datasetIndex = 0;
            }
            dataset = object['datasets'][datasetIndex];

            options = JSON.parse('{}');

            // render component with selected dataset

            switch (component['type']) {
                case "barchart":
                    composition = (composition + Rafaello.BarChart((width - 1), (height - 1), dataset, options));
                    break;
                case "scale":
                    composition = (composition + Rafaello.Scale((width - 1), (height - 1), dataset, options));
                    break;
            }

            i = (i + 1);
        }

        composition = (composition + "</svg>");

        return composition;
    }

    window.Rafaello = Rafaello;
}());
