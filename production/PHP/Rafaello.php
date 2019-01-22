<?php
class Rafaello {
    public function __construct() {
    }

    public static function BarChart($width, $height, $data) {
        $chart = "";
        $style = json_decode("{}");

        $chart = "<svg ";
        $chart = ((($chart . " width=\"") . $width) . "\"");
        $chart = ((($chart . " height=\"") . $height) . "\"");
        $chart = ($chart . " xmlns=\"http://www.w3.org/2000/svg\">");

        $style->{"fill"} = "#cc0000";
        $style->{"stroke"} = "#00cc00";
        $style->{"stroke-width"} = "10";
        $chart = ($chart . self::Rectangle(10, 10, 80, 80, $style));

        $chart = ($chart . "</svg>");

        return $chart;
    }

    // Format style object as Xml attribute string
    public static function FormatStyle($style) {
        $attrStr = "";

        if (property_exists($style, "fill")) {
            $attrStr = ((($attrStr . " fill=\"") . $style->{"fill"}) . "\"");
        }

        return $attrStr;
    }

    // Create a rect element
    public static function Rectangle($x, $y, $width, $height, $style) {
        $element = "";
        $element = "<rect ";
        $element = ((($element . " x=\"") . (string)($x)) . "\"");
        $element = ((($element . " y=\"") . (string)($y)) . "\"");
        $element = ((($element . " width=\"") . (string)($width)) . "\"");
        $element = ((($element . " height=\"") . (string)($height)) . "\"");
        $element = ($element . self::FormatStyle($style));
        $element = ($element . " />");
        return $element;
    }

}

?>