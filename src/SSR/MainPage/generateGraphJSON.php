<?php
    namespace Pollio\SSR\MainPage\GraphJson;

    use Pollio\DataAccess\MainPage\Graph;

    function getGraphsJson(array $graphs) {
        $graphsJSON = array();

        foreach($graphs as $graph) {
            array_push($graphsJSON, $graph->toJSON());
        }

        $graphsJSONString = join(",", $graphsJSON);
        return "[$graphsJSONString]";
    }
?>