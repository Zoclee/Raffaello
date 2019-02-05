(function () {
    var Rafaello = {};

    // ***** BarGraph ********************

    Rafaello.BarGraph = function (svgWidth, svgHeight, dataset, options) {
        var component = '';
        var attr = JSON.parse('{}');
        var points = 0;
        var i = 0;
        var max = 0;

        // initialize default values

        if (!(options.hasOwnProperty('x'))) {
            options['x'] = 0;
        }
        if (!(options.hasOwnProperty('width'))) {
            options['width'] = (svgWidth - options['x']);
        }

        // determine maximum height

        points = Object.keys(dataset['data']).length;

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
        attr['width'] = parseInt(Math.floor((options['width'] - ((points - 1) * 5)) / points));
        attr['fill'] = '#00cc00';
        attr['fill-opacity'] = 0.75;
        attr['stroke'] = '#004000';
        attr['stroke-opacity'] = 0.75;
        attr['stroke-width'] = 1;

        // create bars

        i = 0;
        while ((i < points)) {
            attr['x'] = ((options['x'] + (attr['width'] * i)) + (5 * i));
            attr['height'] = (Math.round((svgHeight * (dataset['data'][i] / max)) * Math.pow(10, 0)) / Math.pow(10, 0));
            attr['y'] = (svgHeight - attr['height']);
            component = (component + Rafaello.BuildElement('rect', attr, ''));
            i = (i + 1);
        }

        return component;
    }

    // ***** CandlestickGraph ********************

    Rafaello.CandlestickGraph = function (svgWidth, svgHeight, datasets, options) {
        var component = '';
        var attr = JSON.parse('{}');
        var lineAttr = JSON.parse('{}');
        var points = 0;
        var i = 0;
        var max = 0;
        var min = 0;

        // initialize default values

        if (!(options.hasOwnProperty('x'))) {
            options['x'] = 0;
        }
        if (!(options.hasOwnProperty('width'))) {
            options['width'] = (svgWidth - options['x']);
        }

        // determine maximum height

        points = Object.keys(datasets[0]['data']).length;

        max = datasets[0]['data'][0];
        min = datasets[0]['data'][0];
        i = 0;
        while ((i < points)) {
            if ((datasets[0]['data'][i] > max)) {
                max = datasets[0]['data'][i];
            }
            if ((datasets[1]['data'][i] > max)) {
                max = datasets[1]['data'][i];
            }
            if ((datasets[2]['data'][i] > max)) {
                max = datasets[2]['data'][i];
            }
            if ((datasets[3]['data'][i] > max)) {
                max = datasets[3]['data'][i];
            }
            if ((datasets[0]['data'][i] < min)) {
                min = datasets[0]['data'][i];
            }
            if ((datasets[1]['data'][i] < min)) {
                min = datasets[1]['data'][i];
            }
            if ((datasets[2]['data'][i] < min)) {
                min = datasets[2]['data'][i];
            }
            if ((datasets[3]['data'][i] < min)) {
                min = datasets[3]['data'][i];
            }
            i = (i + 1);
        }

        // configure styling attributes

        attr = JSON.parse('{}');
        attr['width'] = parseInt(Math.floor((options['width'] - ((points - 1) * 5)) / points));
        attr['fill'] = '#00cc00';
        attr['fill-opacity'] = 0.75;
        attr['stroke'] = '#004000';
        attr['stroke-opacity'] = 0.75;
        attr['stroke-width'] = 1;

        lineAttr = JSON.parse('{}');
        lineAttr['stroke'] = '#000000';
        lineAttr['stroke-width'] = 1;

        // create bars

        i = 0;
        while ((i < points)) {
            attr['x'] = (((options['x'] + (attr['width'] * i)) + (5 * i)) + 0.5);

            // lines

            lineAttr['x1'] = (attr['x'] + parseInt(Math.floor(attr['width'] / 2)));
            lineAttr['x2'] = lineAttr['x1'];

            // body

            if ((datasets[0]['data'][i] < datasets[3]['data'][i])) {
                attr['y'] = (svgHeight - (Math.round((svgHeight * ((datasets[3]['data'][i] - min) / (max - min))) * Math.pow(10, 0)) / Math.pow(10, 0)));
                attr['height'] = (svgHeight * ((datasets[3]['data'][i] - datasets[0]['data'][i]) / (max - min)));
                attr['fill'] = '#00cc00';
                attr['stroke'] = '#004000';
            } else {
                attr['y'] = (svgHeight - (Math.round((svgHeight * ((datasets[0]['data'][i] - min) / (max - min))) * Math.pow(10, 0)) / Math.pow(10, 0)));
                attr['height'] = (svgHeight * ((datasets[0]['data'][i] - datasets[3]['data'][i]) / (max - min)));
                attr['fill'] = '#cc0000';
                attr['stroke'] = '#400000';
            }

            lineAttr['y1'] = (svgHeight - (Math.round((svgHeight * ((datasets[1]['data'][i] - min) / (max - min))) * Math.pow(10, 0)) / Math.pow(10, 0)));
            lineAttr['y2'] = attr['y'];
            component = (component + Rafaello.BuildElement('line', lineAttr, ''));

            lineAttr['y1'] = (attr['y'] + attr['height']);
            lineAttr['y2'] = (svgHeight - (Math.round((svgHeight * ((datasets[2]['data'][i] - min) / (max - min))) * Math.pow(10, 0)) / Math.pow(10, 0)));
            component = (component + Rafaello.BuildElement('line', lineAttr, ''));

            component = (component + Rafaello.BuildElement('rect', attr, ''));


            i = (i + 1);
        }

        return component;
    }

    // ***** LineGraph ********************

    Rafaello.LineGraph = function (svgWidth, svgHeight, dataset, options) {
        var component = '';
        var attr = JSON.parse('{}');
        var points = 0;
        var i = 0;
        var max = 0;
        var path = '';
        var pointWidth = 0;
        var tmpHeight = 0;

        // initialize default values

        if (!(options.hasOwnProperty('x'))) {
            options['x'] = 0;
        }
        if (!(options.hasOwnProperty('width'))) {
            options['width'] = (svgWidth - options['x']);
        }

        // determine maximum height

        points = Object.keys(dataset['data']).length;

        max = dataset['data'][0];
        i = 1;
        while ((i < points)) {
            if ((dataset['data'][i] > max)) {
                max = dataset['data'][i];
            }
            i = (i + 1);
        }

        // configure styling attributes

        pointWidth = parseInt(Math.floor((options['width'] - ((points - 1) * 5)) / points));

        attr = JSON.parse('{}');
        attr['stroke'] = '#004000';
        attr['stroke-opacity'] = 0.75;
        attr['stroke-width'] = 1;
        attr['fill'] = 'none';

        // create lines

        path = 'M';
        i = 0;
        while ((i < points)) {
            path = (path + ((((options['x'] + (pointWidth * i)) + (pointWidth * 0.5)) + (5 * i))).toString());
            tmpHeight = (Math.round((svgHeight * (dataset['data'][i] / max)) * Math.pow(10, 0)) / Math.pow(10, 0));
            path = ((path + " ") + ((svgHeight - tmpHeight)).toString());
            i = (i + 1);
            if ((i < points)) {
                path = (path + " ");
            }
        }

        attr['d'] = path;

        component = Rafaello.BuildElement('path', attr, '');

        return component;
    }

    // ***** Scale ********************

    Rafaello.Scale = function (svgWidth, svgHeight, dataset, options) {
        var component = '';
        var lineAttr = JSON.parse('{}');
        var textAttr = JSON.parse('{}');
        var i = 0;
        var points = 0;
        var x = 0;
        var y = 0;
        var step = 0;
        var tmpStr = '';
        var scaleWidth = 0;

        // initialize default values

        if (!(options.hasOwnProperty('align'))) {
            options['align'] = 'left';
        }
        if (!(options.hasOwnProperty('x'))) {
            options['x'] = 0;
        }
        if (!(options.hasOwnProperty('y'))) {
            options['y'] = 0;
        }

        // determine step

        points = Object.keys(dataset['data']).length;


        // TODO: Loop through all items
        tmpStr = (dataset['data'][(points - 1)]).toString();
        scaleWidth = (tmpStr.length * 7);

        switch (options['align']) {
            case "bottom":

                step = (svgWidth / (points - 1));

                lineAttr = JSON.parse('{}');
                lineAttr['x1'] = 0;
                lineAttr['x2'] = svgWidth;
                lineAttr['stroke'] = '#000000';
                lineAttr['stroke-width'] = 1;

                // draw horizontal line

                lineAttr['y1'] = (options['y'] + 0);
                lineAttr['y2'] = (options['y'] + 0);
                component = (component + Rafaello.BuildElement('line', lineAttr, ''));

                // draw scale items

                textAttr = JSON.parse('{}');
                textAttr['fill'] = '#000000';
                textAttr['y'] = (options['y'] + 18);
                textAttr['text-anchor'] = 'middle';

                lineAttr['y1'] = (options['y'] + 0);
                lineAttr['y2'] = (options['y'] + 5);

                x = 0;
                i = 0;
                while ((i < points)) {
                    lineAttr['x1'] = x;
                    lineAttr['x2'] = x;
                    component = (component + Rafaello.BuildElement('line', lineAttr, ''));

                    textAttr['x'] = x;
                    component = (component + Rafaello.BuildElement('text', textAttr, (dataset['data'][i]).toString()));

                    x = (x + step);
                    i = (i + 1);
                }

                break;
            case "left":

                step = (svgHeight / (points - 1));

                lineAttr = JSON.parse('{}');
                lineAttr['y1'] = 0;
                lineAttr['y2'] = (svgHeight + 1);
                lineAttr['stroke'] = '#000000';
                lineAttr['stroke-width'] = 1;

                // draw vertical line

                lineAttr['x1'] = ((options['x'] + scaleWidth) + 10);
                lineAttr['x2'] = ((options['x'] + scaleWidth) + 10);
                component = (component + Rafaello.BuildElement('line', lineAttr, ''));

                // draw scale items

                textAttr = JSON.parse('{}');
                textAttr['fill'] = '#000000';
                textAttr['x'] = options['x'];
                lineAttr['x1'] = ((options['x'] + scaleWidth) + 5);
                lineAttr['x2'] = ((options['x'] + scaleWidth) + 10);
                y = svgHeight;
                i = 0;
                while ((i < points)) {
                    lineAttr['y1'] = y;
                    lineAttr['y2'] = y;
                    component = (component + Rafaello.BuildElement('line', lineAttr, ''));

                    textAttr['y'] = y;
                    component = (component + Rafaello.BuildElement('text', textAttr, (dataset['data'][i]).toString()));

                    y = (y - step);
                    i = (i + 1);
                }

                break;
            case "right":

                step = (svgHeight / (points - 1));

                lineAttr = JSON.parse('{}');
                lineAttr['y1'] = 0;
                lineAttr['y2'] = (svgHeight + 1);
                lineAttr['stroke'] = '#000000';
                lineAttr['stroke-width'] = 1;

                // draw vertical line

                lineAttr['x1'] = options['x'];
                lineAttr['x2'] = options['x'];

                component = (component + Rafaello.BuildElement('line', lineAttr, ''));

                // draw scale items

                textAttr = JSON.parse('{}');
                textAttr['fill'] = '#000000';
                textAttr['x'] = (options['x'] + 9);
                lineAttr['x1'] = options['x'];
                lineAttr['x2'] = (options['x'] + 5);
                y = svgHeight;
                i = 0;
                while ((i < points)) {
                    lineAttr['y1'] = y;
                    lineAttr['y2'] = y;
                    component = (component + Rafaello.BuildElement('line', lineAttr, ''));

                    textAttr['y'] = y;
                    component = (component + Rafaello.BuildElement('text', textAttr, (dataset['data'][i]).toString()));

                    y = (y - step);
                    i = (i + 1);
                }

                break;
            case "top":

                step = (svgWidth / (points - 1));

                lineAttr = JSON.parse('{}');
                lineAttr['x1'] = 0;
                lineAttr['x2'] = svgWidth;
                lineAttr['stroke'] = '#000000';
                lineAttr['stroke-width'] = 1;

                // draw horizontal line

                lineAttr['y1'] = (options['y'] + 19);
                lineAttr['y2'] = (options['y'] + 19);
                component = (component + Rafaello.BuildElement('line', lineAttr, ''));

                // draw scale items

                textAttr = JSON.parse('{}');
                textAttr['fill'] = '#000000';
                textAttr['y'] = (options['y'] + 12);
                textAttr['text-anchor'] = 'middle';

                lineAttr['y1'] = (options['y'] + 14);
                lineAttr['y2'] = (options['y'] + 19);

                x = 0;
                i = 0;
                while ((i < points)) {
                    lineAttr['x1'] = x;
                    lineAttr['x2'] = x;
                    component = (component + Rafaello.BuildElement('line', lineAttr, ''));

                    textAttr['x'] = x;
                    component = (component + Rafaello.BuildElement('text', textAttr, (dataset['data'][i]).toString()));

                    x = (x + step);
                    i = (i + 1);
                }

                break;
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

    Rafaello.Render = function (svgWidth, svgHeight, object) {
        var composition = '';
        var dataset = JSON.parse('{}');
        var options = JSON.parse('{}');
        var i = 0;
        var componentCount = 0;
        var component = JSON.parse('{}');
        var datasetIndex = 0;

        composition = '<svg ';
        composition = (((composition + " width=\"") + svgWidth) + "\"");
        composition = (((composition + " height=\"") + svgHeight) + "\"");
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
            if (component.hasOwnProperty('options')) {
                options = component['options'];
            }

            // render component with selected dataset

            switch (component['type']) {
                case "candlestickgraph":
                    composition = (composition + Rafaello.CandlestickGraph((svgWidth - 1), (svgHeight - 1), object['datasets'], options));
                    break;
                case "bargraph":
                    composition = (composition + Rafaello.BarGraph((svgWidth - 1), (svgHeight - 1), dataset, options));
                    break;
                case "linegraph":
                    composition = (composition + Rafaello.LineGraph((svgWidth - 1), (svgHeight - 1), dataset, options));
                    break;
                case "scale":
                    composition = (composition + Rafaello.Scale((svgWidth - 1), (svgHeight - 1), dataset, options));
                    break;
            }

            i = (i + 1);
        }

        composition = (composition + "</svg>");

        return composition;
    }

    window.Rafaello = Rafaello;
}());
