<?php

    require_once realpath("../src/get-content.php");
    require_once realpath("../src/DataAccess/getConnection.php");

    use function Pollio\DataAccess\getConnection;
    use function Pollio\Url\getBaseURL;

    function insertPollQuery ($question, $userId, $openDate, $closeDate) {
        if ($openDate == "") {
            $openDate = "NULL";
        }

        if ($closeDate == "") {
            $closeDate = "NULL";
        }

        return "INSERT INTO Polls (
            Question,
            CreatedDate,
            CloseDate,
            OpenDate,
            CreatorId
        )
        VALUES ('$question', CURDATE(), $closeDate, $openDate, $userId);";
    }

    function insertPollOptionQuery($optionName, $pollPriority) {
        return "INSERT INTO PollOptions (
            PollId,
            OptionName,
            PollPriority,
            Votes
        )
        VALUES((SELECT PollId FROM Polls ORDER BY PollId DESC LIMIT 1), '$optionName', $pollPriority, 0);";
    }

    try {
        $connection = getConnection();
        $connection->query(insertPollQuery($_POST["pollTitle"], 1 , $_POST["openDate"], $_POST["closeDate"]));
        
        $currOption = 0;

        while ($currOption <=4) {
            $option = $_POST["option$currOption"];
            if ($_POST["option$currOption"] != "" && $_POST["option$currOption"] != null)
            {   
                $connection->query(insertPollOptionQuery($_POST["option$currOption"], $currOption));
            }
            $currOption += 1;
        }
    
        $baseURL = getBaseURL(true);
        header("Location: {$baseURL}pollio/poll_management");
        die();
    } catch (PDOException $ex) {
        echo $ex->getMessage();
    }
?>