<?php
    namespace Pollio\DataAccess\PollVote;
    
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
                    ),
                    new PollOption(
                        1,
                        "Vue",
                    )
                ),
                43534536,
                $pollId
        );
    }
?>