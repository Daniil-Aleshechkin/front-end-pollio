<?php

    require_once realpath("../src/get-content.php");
    require_once realpath("../src/DataAccess/getConnection.php");

    use function Pollio\DataAccess\getConnection;
    use function Pollio\Url\getBaseURL;

    function getVoteQuery($pollId, $pollPriority) {
        return "UPDATE PollOptions
        SET 
            Votes = Votes + 1,
            LastVoteDate = CURDATE()
        WHERE PollId = $pollId AND PollPriority = $pollPriority;";
    }

    function vote($pollId, $pollPriority) {
        $connection = getConnection();

        $connection->query(getVoteQuery($pollId, $pollPriority));
    }

    $pollId = $_GET["PollId"];
    vote($pollId, $_POST["vote"]);
    // $baseURL = getBaseURL(true);
    // header("Location: {$baseURL}pollio/poll_results?pollID=$pollId");
    // die();
?>