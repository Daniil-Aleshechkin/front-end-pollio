<?php
    require_once realpath("../vendor/autoload.php");
    require_once realpath("../src/get-content.php");
    require_once realpath("../src/DataAccess/poll.php");
    require_once realpath("../src/DataAccess/MainPage/getGraph.php");
    require_once realpath("../src/DataAccess/getConnection.php");
    require_once realpath("../src/SSR/MainPage/generateGraph.php");
    require_once realpath("../src/SSR/MainPage/generateGraphJSON.php");
    require_once realpath("../src/SSR/MainPage/generateColors.php");
    require_once realpath("../src/SSR/MainPage/generateLegend.php");

    use function Pollio\Url\getJSFrom;
    use function Pollio\Url\getBaseURL;
    use function Pollio\DataAccess\MainPage\getGraphData;
    use function Pollio\SSR\MainPage\GraphJson\getGraphsJson;
    use function Pollio\SSR\MainPage\Graph\generateGraphSegments;
    use function Pollio\SSR\MainPage\Colors\defineColorsForGraphs;
    use function Pollio\SSR\MainPage\Legend\generateLegend;

    $graphs = getGraphData();
    defineColorsForGraphs($graphs);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns ="http://www.w3.org/1999/xhtml"
 lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Open+Sans&display=swap" rel="stylesheet"> 
    <title>Pollio</title>
    <script defer src="<?php echo getJSFrom("index"); ?>"></script>
    <script>
        let graphs = <?php echo getGraphsJson($graphs)?>
    </script>
</head>
<body>
    <div class="nav-bar">
        <div class="logo"><p>logo</p></div>
        <div class="title">poll.io</div>
    </div>
    <div class="main-content">
        <div class="poll-display">
            <div class="main-graph-display">
                <h2><?php echo $graphs[0]->Question; ?></h2>
                <div class="graph" id="main-graph">
                    <?php
                        echo generateGraphSegments($graphs[0], false);
                    ?>
                </div>
                <div class="legend">
                    <?php echo generateLegend($graphs[0])?>
                </div>
            </div>
            <div class="graph-side-bar">
                <div class="graph" id="graph-1">
                    <?php
                        echo generateGraphSegments($graphs[1], true);
                    ?>
                </div>
                <div class="graph" id="graph-2">
                    <?php
                        echo generateGraphSegments($graphs[2], true);
                    ?>
                </div>
                <div class="graph" id="graph-3">
                    <?php
                        echo generateGraphSegments($graphs[3], true);
                    ?>
                </div>
                <div class="graph" id="graph-4">
                    <?php
                        echo generateGraphSegments($graphs[4], true);
                    ?>    
                </div>
            </div>
        </div>

        <div class="welcome-content">
            <h1>Make polls for anyone</h1>
            <h1>Complete polls</h1>
            <div>
                <form method="POST" id="login-form" action="<?php echo getBaseURL(true)?>api/login.php">
                    <h3>Welcome</h3>
                    <p id="login-errors" class="errors"></p>
                    <div class="box">
                        <label for="email">
                            Email
                        </label>
                        <p class="errors" id="email-errors"></p>
                        <input type="text" name="email" id="email"/>
                        <label for="password">
                            Password
                        </label>
                        <p class="errors" id="password-errors"></p>
                        <input type="password" name="password" id="password"/>
                    </div>           
                    <div class="login-btns">
                        <a href="<?php echo getBaseURL(true)?>pollio/sign_up" class="btn-danger">
                            Sign up
                        </a>
                        <input type="submit" class="btn-common" value="Login"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>