<?php 
    require_once realpath("../../vendor/autoload.php");
    require_once realpath("../../src/get-content.php");
    require_once realpath("../../src/DataAccess/poll.php");

    use function Pollio\Url\getJSFrom;
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
    <title>Pollio - My Polls</title>
    <script defer src="<?php echo getJSFrom("poll_management");?>"></script>
</head>
<body>
    <div class="nav-bar">
        <a href="/~dsa005/pollio/" class="logo"><p>logo</p></a>
        <div class="user-welcome">Welcome, Daniil</div>
        <a href="/~dsa005/pollio/poll_creation" class="create-btn">
            <div>Create</div> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        </a>
        <div class="title">poll.io</div>
    </div>
    <div class="main-content">
        
    </div>
</body>
</html>