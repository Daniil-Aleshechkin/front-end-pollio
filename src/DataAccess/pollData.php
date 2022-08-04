<?php
    namespace Pollio\DataAccess\MainPage;
    print(realpath("./graph.php"));
    require "C:\dev\cs215-proj\\front-end-pollio\src\DataAccess\graph.php";
    use Pollio\DataAccess\MainPage\Graph;
    use Pollio\DataAccess\MainPage\GraphOption;

    function getGraphData() {

        return array(
            new Graph(
                "Majority",
                array(
                    new GraphOption(
                        100,
                        "React Better"
                    ),
                    new GraphOption(
                        1,
                        "Vue"
                    )
    
                )
            ),
            new Graph(
                "Majority",
                array(
                    new GraphOption(
                        100,
                        "React better"
                    ),
                    new GraphOption(
                        10,
                        "Vue"
                    )
    
                )
            ),
            new Graph(
                "Majority",
                array(
                    new GraphOption(
                        10,
                        "React"
                    ),
                    new GraphOption(
                        1,
                        "Vue"
                    )
    
                )
            ),
            new Graph(
                "Majority",
                array(
                    new GraphOption(
                        10,
                        "React"
                    ),
                    new GraphOption(
                        1,
                        "Vue"
                    )
    
                )
            ),
            new Graph(
                "Majority",
                array(
                    new GraphOption(
                        10,
                        "React"
                    ),
                    new GraphOption(
                        1,
                        "Vue"
                    )
    
                )
            )
        );
    }
?>