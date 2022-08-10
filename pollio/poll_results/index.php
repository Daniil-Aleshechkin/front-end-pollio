<?php 
    require_once realpath("../../vendor/autoload.php");
    require_once realpath("../../src/get-content.php");
    require_once realpath("../../src/DataAccess/poll.php");
    require_once realpath("../../src/DataAccess/getConnection.php");
    require_once realpath("../../src/DataAccess/PollResults/getPollResults.php");
    require_once realpath("../../src/SSR/PollResults/generatePollResults.php");

    use function Pollio\Url\getJSFrom;
    use function Pollio\Url\getBaseURL;
    use function Pollio\Url\getCSSLinkFrom;
    use function Pollio\DataAccess\PollResults\getPollById;
    use function Pollio\SSR\PollResults\PollOptions\generatePollOptions;
    use function Pollio\SSR\PollResults\PollOptions\getUserNavItems;
    session_start();

    $poll = getPollById($_GET["pollID"]);
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
    <title>Pollio - Poll Results</title>
    <script defer src="<?php echo getJSFrom("poll_results");?>"></script>
    <?php echo getCSSLinkFrom("poll_results");?>
</head>
<body>
    <div class="nav-bar">
        <a href="<?php echo getBaseURL(true)?>pollio/" class="logo"><p>logo</p></a>
        <?php echo getUserNavItems($_SESSION['UserId'])?>
        <div class="title">poll.io</div>
    </div>

    <div class="main-content">
        <div id="results" class="results">
            <h1><?php echo $poll->Question?></h1>
            <div class="options">
                <?php echo generatePollOptions($poll) ?>
            </div>
        </div>
    </div>
</body>
</html>