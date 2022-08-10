<?php 
    require_once realpath("../../vendor/autoload.php");
    require_once realpath("../../src/get-content.php");
    require_once realpath("../../src/DataAccess/poll.php");
    require_once realpath("../../src/DataAccess/getConnection.php");
    require_once realpath("../../src/DataAccess/PollVote/getPollOptionsById.php");
    require_once realpath("../../src/SSR/PollVote/generatePollOptions.php");

    use function Pollio\Url\getJSFrom;
    use function Pollio\Url\getCSSLinkFrom;
    use function POllio\Url\getBaseURL;
    use function Pollio\DataAccess\PollVote\getPollById;
    use function Pollio\SSR\PollVote\PollOptions\generatePollOptions;

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
    <title>Pollio - Vote</title>
    <script defer src="<?php echo getJSFrom("poll_vote");?>"></script>
    <?php echo getCSSLinkFrom("poll_vote");?>
</head>
<body>
    <div class="nav-bar">
        <a href="<?php echo getBaseURL(true)?>pollio/" class="logo"><p>logo</p></a>
        <div class="title">poll.io</div>
    </div>
    <div class="main-content">
        <form method="POST" action="<?php echo getBaseURL(true)?>api/vote.php?PollId=<?php echo $_GET["pollID"]?>" id="poll" class="poll">
            <h1><?php echo $poll->Question ?></h1>
            <div class="box">
                <?php echo generatePollOptions($poll)?>
            </div>
            <input type="submit" class="btn-common" value="Save">
        </form>
    </div>
</body>
</html>