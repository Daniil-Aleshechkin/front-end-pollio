<?php
    require_once realpath("../src/DataAccess/MainPage/getGraph.php");
    require_once realpath("../src/get-content.php");
    require_once realpath("../src/DataAccess/poll.php");
    require_once realpath("../src/DataAccess/getConnection.php");
    require_once realpath("../src/SSR/MainPage/generateColors.php");

    use function Pollio\DataAccess\MainPage\getGraphData;
    use function Pollio\SSR\MainPage\Colors\defineColorsForGraphs;
    echo json_encode(defineColorsForGraphs(getGraphData()));

?>