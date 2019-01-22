<?php
class Rafaello {
    public function __construct() {
    }

    public static function BarChart($width, $height, $data) {
        $chart = "";
        $attr = json_decode("{}");

        $chart = "<svg ";
        $chart = ((($chart . " width=\"") . $width) . "\"");
        $chart = ((($chart . " height=\"") . $height) . "\"");
        $chart = ($chart . " xmlns=\"http://www.w3.org/2000/svg\">");

        $attr->{"x"} = 10;
        $attr->{"y"} = 10;
        $attr->{"width"} = 80;
        $attr->{"height"} = 80;
        $attr->{"fill"} = "#cc0000";
        $attr->{"stroke"} = "#00cc00";
        $attr->{"stroke-width"} = "10";
        $chart = ($chart . self::BuildElement("rect", $attr));

        $chart = ($chart . "</svg>");

        return $chart;
    }

    // Build SVG element
    public static function BuildElement($name, $attributes) {
        $element = "";
        $i = 0;

        $element = ("<" . $name);

        $i = 0;
        while (($i < count((array)$attributes))) {
            $element = ((((($element . " ") . array_keys((array)$attributes)[$i]) . "=\"") . $attributes->{array_keys((array)$attributes)[$i]}) . "\"");
            $i = ($i + 1);
        }

        $element = ($element . " />");

        return $element;
    }

}

?>