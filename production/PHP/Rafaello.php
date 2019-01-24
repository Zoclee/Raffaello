<?php
class Rafaello {
    public function __construct() {
    }

    // ***** BarChart ********************

    public static function BarChart($width, $height, $chartData) {
        $chart = "";
        $attr = json_decode("{}");
        $points = 0;
        $i = 0;
        $max = 0;
        $yScaleMargin = 0;
        $maxScaleLen = 0;

        $chart = "<svg ";
        $chart = ((($chart . " width=\"") . $width) . "\"");
        $chart = ((($chart . " height=\"") . $height) . "\"");
        $chart = ($chart . " xmlns=\"http://www.w3.org/2000/svg\">");

        $points = count($chartData->{"datasets"}[0]->{"data"});

        // determine scale margins

        $maxScaleLen = 9;
        $yScaleMargin = ($maxScaleLen * 9);

        // determine maximum height

        $max = $chartData->{"datasets"}[0]->{"data"}[0];
        $i = 1;
        while (($i < $points)) {
            if (($chartData->{"datasets"}[0]->{"data"}[$i] > $max)) {
                $max = $chartData->{"datasets"}[0]->{"data"}[$i];
            }
            $i = ($i + 1);
        }

        // y-axis

        $attr = json_decode("{}");
        $attr->{"x1"} = (($width - $yScaleMargin) + 5);
        $attr->{"y1"} = 0;
        $attr->{"x2"} = (($width - $yScaleMargin) + 5);
        $attr->{"y2"} = $height;
        $attr->{"stroke"} = "#000000";
        $attr->{"stroke-width"} = 1;
        $chart = ($chart . self::rafBuildElement("line", $attr, ""));

        // scale values

        $attr = json_decode("{}");
        $attr->{"x"} = (($width - $yScaleMargin) + 10);
        $attr->{"y"} = 100;
        $attr->{"fill"} = "#000000";
        $chart = ($chart . self::rafBuildElement("text", $attr, "Test12345"));

        // configure styling attributes

        $attr = json_decode("{}");
        $attr->{"width"} = intval(floor((($width - (($points - 1) * 5)) - $yScaleMargin) / $points));
        $attr->{"fill"} = "#00cc00";
        $attr->{"fill-opacity"} = 0.75;
        $attr->{"stroke"} = "#004000";
        $attr->{"stroke-opacity"} = 0.75;
        $attr->{"stroke-width"} = 1;

        // create bars

        $i = 0;
        while (($i < $points)) {
            $attr->{"x"} = (($attr->{"width"} * $i) + (5 * $i));
            $attr->{"height"} = round(($height * ($chartData->{"datasets"}[0]->{"data"}[$i] / $max)), 0);
            $attr->{"y"} = ($height - $attr->{"height"});
            $chart = ($chart . self::rafBuildElement("rect", $attr, ""));
            $i = ($i + 1);
        }

        $chart = ($chart . "</svg>");

        return $chart;
    }

    // ***** rafBuildElement ********************

    public static function rafBuildElement($name, $attributes, $content) {
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

}

?>