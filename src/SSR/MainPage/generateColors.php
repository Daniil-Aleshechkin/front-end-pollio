<?php
    namespace Pollio\SSR\MainPage\Colors;

    use Pollio\DataAccess\Models\Poll;

    function defineColorsForGraphs(array $graphs) {
        foreach($graphs as $graph) {
            defineGraphColors($graph);
        }
        return $graphs;
    }

    function defineGraphColors(Poll $graph) {
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