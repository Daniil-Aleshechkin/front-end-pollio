<?php
    namespace Pollio\DataAccess\PollManagement;
    
    use Pollio\DataAccess\Models\Poll;
    use Pollio\DataAccess\Models\PollOption;
    use function Pollio\DataAccess\getConnection;
    use PDOException;

    function getUserPollsQuery(int $userID) {
        return "SELECT
        P.PollId,
        P.Question,
        P.CreatedDate,
        PO.OptionName,
        PO.Votes,
        PO.PollPriority
    FROM Polls AS P
    INNER JOIN Users AS U ON
        P.CreatorId = U.UserId
    INNER JOIN PollOptions AS PO ON
        PO.PollId = P.PollId
    WHERE
        U.UserId = $userID;";
    }

    function getPolls(int $userID) {
        try {
            $connection = getConnection();
            
            $currentPoll = -1;
            $pollQuestion = "";
            $options = array();
            $polls = array();
            $pollDate = -1;

            foreach($connection->query(getUserPollsQuery($userID)) as $row) {
                if ($row["PollId"] !== $currentPoll) {
                    if ($currentPoll != -1) {
                        array_push($polls, new Poll($pollQuestion, $options, $pollDate, $currentPoll));
                    }
                    $options = array();
                    $currentPoll = $row["PollId"];
                    $pollQuestion = $row["Question"];
                    $pollDate = strtotime($row["CreatedDate"]);
                }
                array_push($options, new PollOption($row["Votes"],$row["OptionName"], $row["PollPriority"]));
            }
            array_push($polls, new Poll($pollQuestion, $options, $pollDate, $currentPoll));
        }
        catch (PDOException $ex) {
            echo $ex->getMessage();
        }

        return $polls;
    }
?>