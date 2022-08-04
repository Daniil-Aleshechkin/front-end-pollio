<?php
    namespace Pollio\SSR\MainPage\Colors;

    use Pollio\DataAccess\MainPage\Graph;

    function defineColorsForGraphs(array $graphs) {
        foreach($graphs as $graph) {
            defineGraphColors($graph);
        }
    }

    function defineGraphColors(Graph $graph) {
        $availableColors = array();
        foreach($graph->Options as $index=>$option) {
            array_push($availableColors, $index+1);
        }

        foreach($graph->Options as $option) {
            $pickedColor = array_rand($availableColors);
            $option->Color = $availableColors[$pickedColor];
            array_splice($availableColors, $pickedColor, 1); 
        }
    }
?>