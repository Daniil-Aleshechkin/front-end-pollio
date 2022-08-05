<?php
    namespace Pollio\DataAccess\PollResults;
    
    use Pollio\DataAccess\Models\Poll;
    use Pollio\DataAccess\Models\PollOption;

    function getPollById(int $pollId) {
        return
            new Poll (
                "Majority",
                array(
                    new PollOption(
                        100,
                        "React Better",
                        1
                    ),
                    new PollOption(
                        1,
                        "Vue",
                        2
                    )
                ),
                43534536,
                $pollId
        );
    }
?>