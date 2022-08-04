<?php
    namespace Pollio\DataAccess\MainPage;
    
    use Pollio\DataAccess\Models\Poll;
    use Pollio\DataAccess\Models\PollOption;

    function getGraphData() {

        return array(
            new Poll (
                "Majority",
                array(
                    new PollOption(
                        100,
                        "React Better"
                    ),
                    new PollOption(
                        1,
                        "Vue"
                    )
    
                )
            ),
            new Poll(
                "Majority",
                array(
                    new PollOption(
                        100,
                        "React better"
                    ),
                    new PollOption(
                        10,
                        "Vue"
                    )
    
                )
            ),
            new Poll (
                "Majority",
                array(
                    new PollOption(
                        10,
                        "React"
                    ),
                    new PollOption(
                        1,
                        "Vue"
                    )
    
                )
            ),
            new Poll (
                "Majority",
                array(
                    new PollOption(
                        10,
                        "React"
                    ),
                    new PollOption(
                        1,
                        "Vue"
                    )
    
                )
            ),
            new Poll (
                "Majority",
                array(
                    new PollOption(
                        10,
                        "React"
                    ),
                    new PollOption(
                        1,
                        "Vue"
                    )
    
                )
            )
        );
    }
?>