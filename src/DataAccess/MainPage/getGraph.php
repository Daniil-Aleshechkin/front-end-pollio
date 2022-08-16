<?php

    namespace Pollio\DataAccess\MainPage;

    use PDOException;
    use Pollio\DataAccess\Models\Poll;
    use Pollio\DataAccess\Models\PollOption;
    use function POllio\DataAccess\getConnection;

    function getGraphData() {
        $createTempTableQuery = "CREATE TEMPORARY TABLE temp_polls (
            PollId int,
            Question varchar(100)
        );";

        $insertTempTableQuery = "INSERT INTO temp_polls
        SELECT
            PollId,
            Question
        FROM Polls
        ORDER BY PollId DESC
        LIMIT 5;";
        $selectTop5TablesQuery = "SELECT
        P.PollId,
        P.Question,
        PO.OptionName,
        PO.Votes,
        PO.PollOptionId
    FROM temp_polls AS P
    INNER JOIN PollOptions AS PO ON
        PO.PollId = P.PollId
    ORDER BY P.PollId;";

        $polls = array();

        try {
            $connection = getConnection();
            $connection->query($createTempTableQuery);
            $connection->query($insertTempTableQuery);
            
            $currentPoll = -1;
            $pollQuestion = "undefined";
            $options = array();

            foreach($connection->query($selectTop5TablesQuery) as $row) {
                if ($row["PollId"] !== $currentPoll) {
                    if ($currentPoll != -1) {
                        array_push($polls, new Poll($pollQuestion, $options, 0, $currentPoll));
                    }
                    $options = array();
                    $currentPoll = $row["PollId"];
                    $pollQuestion = $row["Question"];
                }
                array_push($options, new PollOption($row["Votes"],$row["OptionName"],-1,$row["PollOptionId"]));
            }
            array_push($polls, new Poll($pollQuestion, $options, 0, $currentPoll));
            $connection->query("DROP TABLE temp_polls;");
        }
        catch (PDOException $ex) {
            echo $ex->getMessage();
        }

        return $polls;
    }
?>