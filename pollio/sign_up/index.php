<?php 
    require_once realpath("../../vendor/autoload.php");
    require_once realpath("../../src/get-content.php");
    require_once realpath("../../src/DataAccess/getConnection.php");
    
    use function Pollio\Url\getJSFrom;
    use function Pollio\Url\getCSSLinkFrom;
    use function Pollio\Url\getBaseURL;
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
    <title>Pollio - Sign up</title>
    <script defer src="<?php echo getJSFrom("sign_up");?>"></script>
    <?php echo getCSSLinkFrom("sign_up");?>
</head>
<body>
    <div class="nav-bar">
        <a href="<?php echo getBaseURL(true)?>pollio/" class="logo"><p>logo</p></a>
        <div class="title">poll.io</div>
    </div>
    <div class="main-content">
        <form enctype="multipart/form-data" method="POST" id="sign-up-form" action="<?php echo getBaseURL(true)?>api/signUp.php">
            <div class="sign-up-containter">
                <div class="sign-up-form">
                    <h1>Sign up</h1>
                    <div class="box">
                        <label for="username">Username</label>
                        <div class="errors" id="username-errors"></div>
                        <input type="text" name="username" id="username"/>
                        <label for="email">Email</label>
                        <div class="errors" id="email-errors"></div>
                        <input type="text" name="email" id="email"/>
                        <label for="password">Password</label>
                        <div class="errors" id="password-errors"></div>
                        <input type="password" name="password" id ="password"/>
                        <label for="confirmPassword">Confirm Password</label>
                        <div class="errors" id="confirmPassword-errors"></div>
                        <input type="password" name="confirmPassword" id="confirmPassword"/>
                    </div> 
                    <input type="submit" value="Create Account" class="btn-common submit-btn"/>
                </div>
            </div>
            <div class="profile-input">
                <div>
                    <h2>Profile picture</h2>
                    <div class="profile-preview">
                        <div>
                            <h1>Drag and drop a file</h1>
                        </div>
                    </div>
                    <input type="file" name="profile">
                    <div class="errors" id="profile-errors"></div>
                </div>
            </div>
            <input type="submit" value="Create Account" class="btn-common submit-btn"/>
                
        </form>
       
    </div>
</body>
</html>