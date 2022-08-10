<?php
    namespace Pollio\DataAccess\PollVote;
    
    use Pollio\DataAccess\Models\Poll;
    use Pollio\DataAccess\Models\PollOption;
    use function POllio\DataAccess\getConnection;
    use PDOException;

    function getPollQuery(int $pollId) {
        return "SELECT
        P.Question,
        PO.OptionName,
        PO.PollPriority,
        PO.Votes,
        (SELECT LastVoteDate
            FROM PollOptions
            WHERE PollId = @PollId
            ORDER BY LastVoteDate
            LIMIT 1) AS LastVoteDate
    FROM PollOptions AS PO
    INNER JOIN Polls AS P ON
        P.PollId = PO.PollId
    WHERE PO.PollId = $pollId;";
    }

    function getPollById(int $pollId) {

        try {
            $connection = getConnection();
            $options = array();


            foreach($connection->query(getPollQuery($pollId)) as $row) {
                array_push($options, new PollOption($row["Votes"], $row["OptionName"], $row["PollPriority"]));
            }

            $poll = new Poll($row["Question"], $options);
        }
        catch (PDOException $ex) {
            echo $ex->getMessage();
        }

        return $poll;
    }
?>