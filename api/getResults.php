<?php
    require_once realpath("../src/DataAccess/PollResults/getPollResults.php");
    require_once realpath("../src/get-content.php");
    require_once realpath("../src/DataAccess/poll.php");
    require_once realpath("../src/DataAccess/getConnection.php");

    use function Pollio\DataAccess\PollResults\getPollById;
    echo json_encode(getPollById($_GET["PollId"]));

?>