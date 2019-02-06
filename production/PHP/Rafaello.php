<?php
class Rafaello {
    public function __construct() {
    }

    // ***** BarGraph ********************

    public static function BarGraph($svgWidth, $svgHeight, $dataset, $options) {
        $component = "";
        $attr = json_decode("{}");
        $points = 0;
        $i = 0;
        $max = 0;

        // initialize default values

        if (!(property_exists($options, "x"))) {
            $options->{"x"} = 0;
        }
        if (!(property_exists($options, "width"))) {
            $options->{"width"} = ($svgWidth - $options->{"x"});
        }

        // determine maximum height

        $points = count($dataset->{"data"});

        $max = $dataset->{"data"}[0];
        $i = 1;
        while (($i < $points)) {
            if (($dataset->{"data"}[$i] > $max)) {
                $max = $dataset->{"data"}[$i];
            }
            $i = ($i + 1);
        }

        // configure styling attributes

        $attr = json_decode("{}");
        $attr->{"width"} = intval(floor(($options->{"width"} - (($points - 1) * 5)) / $points));
        $attr->{"fill"} = "#00cc00";
        $attr->{"fill-opacity"} = 0.75;
        $attr->{"stroke"} = "#004000";
        $attr->{"stroke-opacity"} = 0.75;
        $attr->{"stroke-width"} = 1;

        // create bars

        $i = 0;
        while (($i < $points)) {
            $attr->{"x"} = (($options->{"x"} + ($attr->{"width"} * $i)) + (5 * $i));
            $attr->{"height"} = round(($svgHeight * ($dataset->{"data"}[$i] / $max)), 0);
            $attr->{"y"} = ($svgHeight - $attr->{"height"});
            $component = ($component . self::BuildElement("rect", $attr, ""));
            $i = ($i + 1);
        }

        return $component;
    }

    // ***** CandlestickGraph ********************

    public static function CandlestickGraph($svgWidth, $svgHeight, $datasets, $options) {
        $component = "";
        $attr = json_decode("{}");
        $lineAttr = json_decode("{}");
        $points = 0;
        $i = 0;
        $max = 0;
        $min = 0;

        // initialize default values

        if (!(property_exists($options, "x"))) {
            $options->{"x"} = 0;
        }
        if (!(property_exists($options, "width"))) {
            $options->{"width"} = ($svgWidth - $options->{"x"});
        }

        // determine maximum height

        $points = count((array)$datasets[0]->{"data"});

        $max = $datasets[0]->{"data"}[0];
        $min = $datasets[0]->{"data"}[0];
        $i = 0;
        while (($i < $points)) {
            if (($datasets[0]->{"data"}[$i] > $max)) {
                $max = $datasets[0]->{"data"}[$i];
            }
            if (($datasets[1]->{"data"}[$i] > $max)) {
                $max = $datasets[1]->{"data"}[$i];
            }
            if (($datasets[2]->{"data"}[$i] > $max)) {
                $max = $datasets[2]->{"data"}[$i];
            }
            if (($datasets[3]->{"data"}[$i] > $max)) {
                $max = $datasets[3]->{"data"}[$i];
            }
            if (($datasets[0]->{"data"}[$i] < $min)) {
                $min = $datasets[0]->{"data"}[$i];
            }
            if (($datasets[1]->{"data"}[$i] < $min)) {
                $min = $datasets[1]->{"data"}[$i];
            }
            if (($datasets[2]->{"data"}[$i] < $min)) {
                $min = $datasets[2]->{"data"}[$i];
            }
            if (($datasets[3]->{"data"}[$i] < $min)) {
                $min = $datasets[3]->{"data"}[$i];
            }
            $i = ($i + 1);
        }

        // configure styling attributes

        $attr = json_decode("{}");
        $attr->{"width"} = intval(floor(($options->{"width"} - (($points - 1) * 5)) / $points));
        $attr->{"fill"} = "#00cc00";
        $attr->{"fill-opacity"} = 0.75;
        $attr->{"stroke"} = "#004000";
        $attr->{"stroke-opacity"} = 0.75;
        $attr->{"stroke-width"} = 1;

        $lineAttr = json_decode("{}");
        $lineAttr->{"stroke"} = "#000000";
        $lineAttr->{"stroke-width"} = 1;

        // create bars

        $i = 0;
        while (($i < $points)) {
            $attr->{"x"} = ((($options->{"x"} + ($attr->{"width"} * $i)) + (5 * $i)) + 0.5);

            // lines

            $lineAttr->{"x1"} = ($attr->{"x"} + intval(floor($attr->{"width"} / 2)));
            $lineAttr->{"x2"} = $lineAttr->{"x1"};

            // body

            if (($datasets[0]->{"data"}[$i] < $datasets[3]->{"data"}[$i])) {
                $attr->{"y"} = ($svgHeight - round(($svgHeight * (($datasets[3]->{"data"}[$i] - $min) / ($max - $min))), 0));
                $attr->{"height"} = ($svgHeight * (($datasets[3]->{"data"}[$i] - $datasets[0]->{"data"}[$i]) / ($max - $min)));
                $attr->{"fill"} = "#00cc00";
                $attr->{"stroke"} = "#004000";
            } else {
                $attr->{"y"} = ($svgHeight - round(($svgHeight * (($datasets[0]->{"data"}[$i] - $min) / ($max - $min))), 0));
                $attr->{"height"} = ($svgHeight * (($datasets[0]->{"data"}[$i] - $datasets[3]->{"data"}[$i]) / ($max - $min)));
                $attr->{"fill"} = "#cc0000";
                $attr->{"stroke"} = "#400000";
            }

            $lineAttr->{"y1"} = ($svgHeight - round(($svgHeight * (($datasets[1]->{"data"}[$i] - $min) / ($max - $min))), 0));
            $lineAttr->{"y2"} = $attr->{"y"};
            $component = ($component . self::BuildElement("line", $lineAttr, ""));

            $lineAttr->{"y1"} = ($attr->{"y"} + $attr->{"height"});
            $lineAttr->{"y2"} = ($svgHeight - round(($svgHeight * (($datasets[2]->{"data"}[$i] - $min) / ($max - $min))), 0));
            $component = ($component . self::BuildElement("line", $lineAttr, ""));

            $component = ($component . self::BuildElement("rect", $attr, ""));


            $i = ($i + 1);
        }

        return $component;
    }

    // ***** HeatMap ********************

    public static function HeatMap($svgWidth, $svgHeight, $dataset, $options) {
        $component = "";
        $attr = json_decode("{}");
        $points = 0;
        $i = 0;
        $max = 0;
        $min = 0;
        $value = floatval(0);

        // initialize default values

        if (!(property_exists($options, "x"))) {
            $options->{"x"} = 0;
        }
        if (!(property_exists($options, "width"))) {
            $options->{"width"} = ($svgWidth - $options->{"x"});
        }

        // determine maximum height

        $points = count($dataset->{"data"});

        $max = 100;
        $min = 0;
        /*max = dataset["data"][0]
        min = dataset["data"][0]
        i = 1
        while i < points {
            if dataset["data"][i] > max {
               max = dataset["data"][i]
            }
            if dataset["data"][i] < min {
               min = dataset["data"][i]
            }            
            i = i + 1
        }*/

        // configure styling attributes

        $attr = json_decode("{}");
        $attr->{"width"} = intval(floor($options->{"width"} / $points));
        $attr->{"height"} = $svgHeight;
        $attr->{"stroke-width"} = 1;
        $attr->{"y"} = 0;

        // create bars

        $i = 0;
        while (($i < $points)) {
            $attr->{"x"} = ($options->{"x"} + ($attr->{"width"} * $i));
            $value = (($dataset->{"data"}[$i] - $min) / ($max - $min));
            if (($value >= 0.75)) {
                $attr->{"fill"} = "#00aa00";
                $attr->{"stroke"} = "#00aa00";
            } else if (($value >= 0.25)) {
                $attr->{"fill"} = "#aaaa00";
                $attr->{"stroke"} = "#aaaa00";
            } else {
                $attr->{"fill"} = "#aa0000";
                $attr->{"stroke"} = "#aa0000";
            }
            $component = ($component . self::BuildElement("rect", $attr, ""));
            $i = ($i + 1);
        }

        return $component;
    }

    // ***** LineGraph ********************

    public static function LineGraph($svgWidth, $svgHeight, $dataset, $options) {
        $component = "";
        $attr = json_decode("{}");
        $points = 0;
        $i = 0;
        $max = 0;
        $path = "";
        $pointWidth = 0;
        $tmpHeight = 0;

        // initialize default values

        if (!(property_exists($options, "x"))) {
            $options->{"x"} = 0;
        }
        if (!(property_exists($options, "width"))) {
            $options->{"width"} = ($svgWidth - $options->{"x"});
        }

        // determine maximum height

        $points = count($dataset->{"data"});

        $max = $dataset->{"data"}[0];
        $i = 1;
        while (($i < $points)) {
            if (($dataset->{"data"}[$i] > $max)) {
                $max = $dataset->{"data"}[$i];
            }
            $i = ($i + 1);
        }

        // configure styling attributes

        $pointWidth = intval(floor(($options->{"width"} - (($points - 1) * 5)) / $points));

        $attr = json_decode("{}");
        $attr->{"stroke"} = "#004000";
        $attr->{"stroke-opacity"} = 0.75;
        $attr->{"stroke-width"} = 1;
        $attr->{"fill"} = "none";

        // create lines

        $path = "M";
        $i = 0;
        while (($i < $points)) {
            $path = ($path . (string)(((($options->{"x"} + ($pointWidth * $i)) + ($pointWidth * 0.5)) + (5 * $i))));
            $tmpHeight = round(($svgHeight * ($dataset->{"data"}[$i] / $max)), 0);
            $path = (($path . " ") . (string)(($svgHeight - $tmpHeight)));
            $i = ($i + 1);
            if (($i < $points)) {
                $path = ($path . " ");
            }
        }

        $attr->{"d"} = $path;

        $component = self::BuildElement("path", $attr, "");

        return $component;
    }

    // ***** Scale ********************

    public static function Scale($svgWidth, $svgHeight, $dataset, $options) {
        $component = "";
        $lineAttr = json_decode("{}");
        $textAttr = json_decode("{}");
        $i = 0;
        $points = 0;
        $x = 0;
        $y = 0;
        $step = 0;
        $tmpStr = "";
        $scaleWidth = 0;

        // initialize default values

        if (!(property_exists($options, "align"))) {
            $options->{"align"} = "left";
        }
        if (!(property_exists($options, "x"))) {
            $options->{"x"} = 0;
        }
        if (!(property_exists($options, "y"))) {
            $options->{"y"} = 0;
        }

        // determine step

        $points = count($dataset->{"data"});


        // TODO: Loop through all items
        $tmpStr = (string)($dataset->{"data"}[($points - 1)]);
        $scaleWidth = (strlen($tmpStr) * 7);

        switch ($options->{"align"}) {
            case "bottom":

                $step = ($svgWidth / ($points - 1));

                $lineAttr = json_decode("{}");
                $lineAttr->{"x1"} = 0;
                $lineAttr->{"x2"} = $svgWidth;
                $lineAttr->{"stroke"} = "#000000";
                $lineAttr->{"stroke-width"} = 1;

                // draw horizontal line

                $lineAttr->{"y1"} = ($options->{"y"} + 0);
                $lineAttr->{"y2"} = ($options->{"y"} + 0);
                $component = ($component . self::BuildElement("line", $lineAttr, ""));

                // draw scale items

                $textAttr = json_decode("{}");
                $textAttr->{"fill"} = "#000000";
                $textAttr->{"y"} = ($options->{"y"} + 18);
                $textAttr->{"text-anchor"} = "middle";

                $lineAttr->{"y1"} = ($options->{"y"} + 0);
                $lineAttr->{"y2"} = ($options->{"y"} + 5);

                $x = 0;
                $i = 0;
                while (($i < $points)) {
                    $lineAttr->{"x1"} = $x;
                    $lineAttr->{"x2"} = $x;
                    $component = ($component . self::BuildElement("line", $lineAttr, ""));

                    $textAttr->{"x"} = $x;
                    $component = ($component . self::BuildElement("text", $textAttr, (string)($dataset->{"data"}[$i])));

                    $x = ($x + $step);
                    $i = ($i + 1);
                }

                break;
            case "left":

                $step = ($svgHeight / ($points - 1));

                $lineAttr = json_decode("{}");
                $lineAttr->{"y1"} = 0;
                $lineAttr->{"y2"} = ($svgHeight + 1);
                $lineAttr->{"stroke"} = "#000000";
                $lineAttr->{"stroke-width"} = 1;

                // draw vertical line

                $lineAttr->{"x1"} = (($options->{"x"} + $scaleWidth) + 10);
                $lineAttr->{"x2"} = (($options->{"x"} + $scaleWidth) + 10);
                $component = ($component . self::BuildElement("line", $lineAttr, ""));

                // draw scale items

                $textAttr = json_decode("{}");
                $textAttr->{"fill"} = "#000000";
                $textAttr->{"x"} = $options->{"x"};
                $lineAttr->{"x1"} = (($options->{"x"} + $scaleWidth) + 5);
                $lineAttr->{"x2"} = (($options->{"x"} + $scaleWidth) + 10);
                $y = $svgHeight;
                $i = 0;
                while (($i < $points)) {
                    $lineAttr->{"y1"} = $y;
                    $lineAttr->{"y2"} = $y;
                    $component = ($component . self::BuildElement("line", $lineAttr, ""));

                    $textAttr->{"y"} = $y;
                    $component = ($component . self::BuildElement("text", $textAttr, (string)($dataset->{"data"}[$i])));

                    $y = ($y - $step);
                    $i = ($i + 1);
                }

                break;
            case "right":

                $step = ($svgHeight / ($points - 1));

                $lineAttr = json_decode("{}");
                $lineAttr->{"y1"} = 0;
                $lineAttr->{"y2"} = ($svgHeight + 1);
                $lineAttr->{"stroke"} = "#000000";
                $lineAttr->{"stroke-width"} = 1;

                // draw vertical line

                $lineAttr->{"x1"} = $options->{"x"};
                $lineAttr->{"x2"} = $options->{"x"};

                $component = ($component . self::BuildElement("line", $lineAttr, ""));

                // draw scale items

                $textAttr = json_decode("{}");
                $textAttr->{"fill"} = "#000000";
                $textAttr->{"x"} = ($options->{"x"} + 9);
                $lineAttr->{"x1"} = $options->{"x"};
                $lineAttr->{"x2"} = ($options->{"x"} + 5);
                $y = $svgHeight;
                $i = 0;
                while (($i < $points)) {
                    $lineAttr->{"y1"} = $y;
                    $lineAttr->{"y2"} = $y;
                    $component = ($component . self::BuildElement("line", $lineAttr, ""));

                    $textAttr->{"y"} = $y;
                    $component = ($component . self::BuildElement("text", $textAttr, (string)($dataset->{"data"}[$i])));

                    $y = ($y - $step);
                    $i = ($i + 1);
                }

                break;
            case "top":

                $step = ($svgWidth / ($points - 1));

                $lineAttr = json_decode("{}");
                $lineAttr->{"x1"} = 0;
                $lineAttr->{"x2"} = $svgWidth;
                $lineAttr->{"stroke"} = "#000000";
                $lineAttr->{"stroke-width"} = 1;

                // draw horizontal line

                $lineAttr->{"y1"} = ($options->{"y"} + 19);
                $lineAttr->{"y2"} = ($options->{"y"} + 19);
                $component = ($component . self::BuildElement("line", $lineAttr, ""));

                // draw scale items

                $textAttr = json_decode("{}");
                $textAttr->{"fill"} = "#000000";
                $textAttr->{"y"} = ($options->{"y"} + 12);
                $textAttr->{"text-anchor"} = "middle";

                $lineAttr->{"y1"} = ($options->{"y"} + 14);
                $lineAttr->{"y2"} = ($options->{"y"} + 19);

                $x = 0;
                $i = 0;
                while (($i < $points)) {
                    $lineAttr->{"x1"} = $x;
                    $lineAttr->{"x2"} = $x;
                    $component = ($component . self::BuildElement("line", $lineAttr, ""));

                    $textAttr->{"x"} = $x;
                    $component = ($component . self::BuildElement("text", $textAttr, (string)($dataset->{"data"}[$i])));

                    $x = ($x + $step);
                    $i = ($i + 1);
                }

                break;
        }

        return $component;
    }

    // ===========================================================================
    //   HELPER METHODS
    // ===========================================================================

    // ***** BuildElement ********************

    public static function BuildElement($name, $attributes, $content) {
        $element = "";
        $i = 0;

        $element = ("<" . $name);
        $i = 0;
        while (($i < count((array)$attributes))) {
            $element = ((((($element . " ") . array_keys((array)$attributes)[$i]) . "=\"") . $attributes->{array_keys((array)$attributes)[$i]}) . "\"");
            $i = ($i + 1);
        }
        if (($content != "")) {
            $element = ((((($element . ">") . $content) . "</") . $name) . ">");
        } else {
            $element = ($element . " />");
        }


        return $element;
    }

    // ***** Render ********************

    public static function Render($svgWidth, $svgHeight, $object) {
        $composition = "";
        $dataset = json_decode("{}");
        $options = json_decode("{}");
        $i = 0;
        $componentCount = 0;
        $component = json_decode("{}");
        $datasetIndex = 0;

        $composition = "<svg ";
        $composition = ((($composition . " width=\"") . $svgWidth) . "\"");
        $composition = ((($composition . " height=\"") . $svgHeight) . "\"");
        $composition = ($composition . " xmlns=\"http://www.w3.org/2000/svg\">");

        $componentCount = count($object->{"components"});
        $i = 0;
        while (($i < $componentCount)) {

            $component = $object->{"components"}[$i];

            // get dataset

            if (property_exists($component, "dataset")) {
                $datasetIndex = $component->{"dataset"};
            } else {
                $datasetIndex = 0;
            }
            $dataset = $object->{"datasets"}[$datasetIndex];

            $options = json_decode("{}");
            if (property_exists($component, "options")) {
                $options = $component->{"options"};
            }

            // render component with selected dataset

            switch ($component->{"type"}) {
                case "candlestickgraph":
                    $composition = ($composition . self::CandlestickGraph(($svgWidth - 1), ($svgHeight - 1), $object->{"datasets"}, $options));
                    break;
                case "bargraph":
                    $composition = ($composition . self::BarGraph(($svgWidth - 1), ($svgHeight - 1), $dataset, $options));
                    break;
                case "heatmap":
                    $composition = ($composition . self::HeatMap(($svgWidth - 1), ($svgHeight - 1), $dataset, $options));
                    break;
                case "linegraph":
                    $composition = ($composition . self::LineGraph(($svgWidth - 1), ($svgHeight - 1), $dataset, $options));
                    break;
                case "scale":
                    $composition = ($composition . self::Scale(($svgWidth - 1), ($svgHeight - 1), $dataset, $options));
                    break;
            }

            $i = ($i + 1);
        }

        $composition = ($composition . "</svg>");

        return $composition;
    }

}

?>