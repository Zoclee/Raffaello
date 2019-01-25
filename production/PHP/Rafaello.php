<?php
class Rafaello {
    public function __construct() {
    }

    // ***** BarChart ********************

    public static function BarChart($width, $height, $dataSet) {
        $component = "";
        $attr = json_decode("{}");
        $points = 0;
        $i = 0;
        $max = 0;

        $points = count($dataSet->{"data"});

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

        $max = $dataSet->{"data"}[0];
        $i = 1;
        while (($i < $points)) {
            if (($dataSet->{"data"}[$i] > $max)) {
                $max = $dataSet->{"data"}[$i];
            }
            $i = ($i + 1);
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

        $attr = json_decode("{}");
        $attr->{"width"} = intval(floor(($width - (($points - 1) * 5)) / $points));
        $attr->{"fill"} = "#00cc00";
        $attr->{"fill-opacity"} = 0.75;
        $attr->{"stroke"} = "#004000";
        $attr->{"stroke-opacity"} = 0.75;
        $attr->{"stroke-width"} = 1;

        // create bars

        $i = 0;
        while (($i < $points)) {
            $attr->{"x"} = (($attr->{"width"} * $i) + (5 * $i));
            $attr->{"height"} = round(($height * ($dataSet->{"data"}[$i] / $max)), 0);
            $attr->{"y"} = ($height - $attr->{"height"});
            $component = ($component . self::BuildElement("rect", $attr, ""));
            $i = ($i + 1);
        }

        return $component;
    }

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

    public static function Render($width, $height, $object) {
        $composition = "";
        $dataSet = json_decode("{}");
        $i = 0;
        $componentCount = 0;
        $component = json_decode("{}");

        $composition = "<svg ";
        $composition = ((($composition . " width=\"") . $width) . "\"");
        $composition = ((($composition . " height=\"") . $height) . "\"");
        $composition = ($composition . " xmlns=\"http://www.w3.org/2000/svg\">");

        $componentCount = count($object->{"components"});
        $i = 0;
        while (($i < $componentCount)) {
            $component = $object->{"components"}[$i];
            switch ($component->{"type"}) {
                case "barchart":
                    $dataSet = $object->{"datasets"}[$component->{"dataset"}];
                    $composition = ($composition . self::BarChart($width, $height, $dataSet));
                    break;
            }

            $i = ($i + 1);
        }

        $composition = ($composition . "</svg>");

        return $composition;
    }

}

?>