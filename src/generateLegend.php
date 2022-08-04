<?php
    namespace Pollio\SSR\MainPage\Legend;

    use Pollio\DataAccess\MainPage\Graph;
    use Pollio\DataAccess\MainPage\GraphOption;

    function generateLegend(Graph $graph) {
        $legendElements = "";

        foreach($graph->Options as $option) {
            $legendElements .= generateLegendElement($option);
        }

        return $legendElements;
    }

    function generateLegendElement(GraphOption $option) {
        return "<p style=\"--legend-color: var(--option-$option->Color-color);\"> $option->Name</p>";
    }
?>