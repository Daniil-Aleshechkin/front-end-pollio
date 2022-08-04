<?php
    namespace Pollio\SSR\MainPage\Legend;

    use Pollio\DataAccess\Models\Poll;
    use Pollio\DataAccess\Models\PollOption;

    function generateLegend(Poll $graph) {
        $legendElements = "";

        foreach($graph->Options as $option) {
            $legendElements .= generateLegendElement($option);
        }

        return $legendElements;
    }

    function generateLegendElement(PollOption $option) {
        return "<p style=\"--legend-color: var(--option-$option->Color-color);\"> $option->Name</p>";
    }
?>