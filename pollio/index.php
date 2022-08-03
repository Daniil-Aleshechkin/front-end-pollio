<?php 
    use Pollio\Url;

    require_once realpath("vendor/autoload.php");
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
</head>
<body>
    <h1> <?php echo $test ?> </h1>
    <div class="nav-bar">
        <div class="logo"><p>logo</p></div>
        <div class="title">poll.io</div>
    </div>
    <div class="main-content">
        <div class="poll-display">
            <div class="main-graph-display">
                <h2>React or Vue?</h2>
                <div class="graph" id="main-graph">
                    <div class="graph-segment" style="--start: 0; --value: 200; --color: var(--option-1-color); --is-over-50-percent: 1; z-index: 1;"></div>
                    <div class="graph-segment" style="--start: 190; --value: 360; --color: var(--option-2-color); --is-over-50-percent: 1;"></div>
                </div>
                <div class="legend">
                    <p style="--legend-color: var(--option-1-color)">React</p>
                    <p style="--legend-color: var(--option-2-color)">Vue</p>
                </div>
            </div>
            <div class="graph-side-bar">
                <div class="graph" id="graph-1">
                    <div class="graph-segment" style="--start: 0; --value: 120; --color: var(--option-1-color); --is-over-50-percent: 0; z-index: 3; overflow: hidden;"></div>
                    <div class="graph-segment" style="--start: 50; --value: 270; --color: var(--option-2-color); --is-over-50-percent: 1; overflow: hidden; z-index: 2;"></div>
                    <div class="graph-segment" style="--start: 190; --value: 360; --color: var(--option-3-color); --is-over-50-percent: 1; overflow: hidden; z-index: 1;"></div>
                </div>
                <div class="graph" id="graph-2">
                    <div class="graph-segment" style="--start: 0; --value: 40; --color: var(--option-1-color); --is-over-50-percent: 0; overflow: hidden; z-index: 5;"></div>
                    <div class="graph-segment" style="--start: 30; --value: 50; --color: var(--option-2-color); --is-over-50-percent: 0; overflow: hidden; z-index: 4;"></div>
                    <div class="graph-segment" style="--start: 70; --value: 60; --color: var(--option-3-color); --is-over-50-percent: 0; overflow: hidden; z-index: 3;"></div>
                    <div class="graph-segment" style="--start: 120; --value: 200; --color: var(--option-4-color); --is-over-50-percent: 1; z-index: 2;"></div>
                    <div class="graph-segment" style="--start: 190; --value: 360; --color: var(--option-5-color); --is-over-50-percent: 1; z-index: 1;"></div>
                </div>
                <div class="graph" id="graph-3">
                    <div class="graph-segment" style="--start: 0; --value: 100; --color: var(--option-1-color); --is-over-50-percent: 0; overflow: hidden; z-index: 3;"></div>
                    <div class="graph-segment" style="--start: 90; --value: 90; --color: var(--option-2-color); --is-over-50-percent: 0; overflow: hidden; z-index: 2;"></div>
                    <div class="graph-segment" style="--start: 170; --value: 200; --color: var(--option-3-color); --is-over-50-percent: 1;  z-index: 1;"></div>
                </div>
                <div class="graph" id="graph-4">
                    <div class="graph-segment" style="--start: 0; --value: 144; --color: var(--option-1-color); --is-over-50-percent: 0; overflow: hidden; z-index: 3;"></div>
                    <div class="graph-segment" style="--start: 140; --value: 150; --color: var(--option-2-color); --is-over-50-percent: 0; overflow: hidden; z-index: 2;"></div>
                    <div class="graph-segment" style="--start: 280; --value: 100; --color: var(--option-3-color); --is-over-50-percent: 0; overflow: hidden; z-index: 1;"></div>
                </div>
            </div>
        </div>

        <div class="welcome-content">
            <h1>Make polls for anyone</h1>
            <h1>Complete polls</h1>
            <div>
                <form id="login-form" action="/~dsa005/pollio/poll_management">
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
                        <a href="/~dsa005/pollio/sign_up" class="btn-danger">
                            Sign up
                        </a>
                        <input type="submit" href="/~dsa005/pollio/poll_management" class="btn-common" value="Login"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>