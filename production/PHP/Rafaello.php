<?php
class Rafaello {
    public function __construct() {
    }

    public static function BarChart($width, $height, $data) {
        $chart = "";

        $chart = "<svg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"red\" stroke-width=\"4\" fill=\"yellow\" /></svg>";

        return $chart;
    }

}

?>