<?php
    namespace Pollio\DataAccess\PollManagement;
    
    use Pollio\DataAccess\Models\Poll;
    use Pollio\DataAccess\Models\PollOption;

    function getPolls(int $userID) {
        return array(
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
                1
            ),
            new Poll(
                "Majority",
                array(
                    new PollOption(
                        100,
                        "React better",
                        1
                    ),
                    new PollOption(
                        10,
                        "Vue",
                        2
                    )
                ),
                435345364,
                2
            ),
            new Poll (
                "Majority",
                array(
                    new PollOption(
                        10,
                        "React",
                        1
                    ),
                    new PollOption(
                        1,
                        "Vue",
                        2
                    )
                ),
                45345943,
                3
            ),
            new Poll (
                "Majority",
                array(
                    new PollOption(
                        10,
                        "React",
                        1
                    ),
                    new PollOption(
                        1,
                        "Vue",
                        2
                    )
                ),
                439583495345,
                4
            ),
            new Poll (
                "Majority",
                array(
                    new PollOption(
                        10,
                        "React",
                        1
                    ),
                    new PollOption(
                        1,
                        "Vue",
                        2
                    )
                ),
                43598458345,
                5
            )
        );
    }
?>