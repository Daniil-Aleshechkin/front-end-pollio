<?php 
    require_once realpath("../src/get-content.php");
    require_once realpath("../src/DataAccess/getConnection.php");
    require_once realpath("../vendor/mervick/aes-everywhere/php/src/AES256.php");

    use mervick\aesEverywhere\AES256;

    use function Pollio\DataAccess\getConnection;
    use function Pollio\Url\getBaseURL;

    function getSaltKey($email) {
        return "SELECT SaltKey FROM Users WHERE Email='$email'";
    }

    function getUserID($passwordHash, $email) {
        return "SELECT UserId, Username FROM Users WHERE Email='$email' AND PasswordHash=0x$passwordHash";
    }
    $loginSuccessful = false;
    $connection = getConnection();
    $AES = new AES256();
    foreach ($connection->query(getSaltKey($_POST['email'])) as $row) {
        $passwordHash = hash('sha256', $_POST["password"], true);
        //echo $AES->decrypt($row['SaltKey'], "unsecurekey");
        $passwordHashSalted = hash('sha256', $passwordHash . $AES->decrypt($row['SaltKey'], "unsecurekey"), true);
    }

    if($_SESSION['UserId'] != null) {
        session_destroy();
    }

    session_start();

    foreach($connection->query(getUserID(bin2hex($passwordHashSalted), $_POST['email'])) as $row)  {
        $_SESSION['UserId'] = $row["UserId"];
        $_SESSION['Username'] = $row["Username"];
        $loginSuccessful = true;
    }

    if ($loginSuccessful) {
        $baseURL = getBaseURL(true);
        header("Location: {$baseURL}pollio/poll_management");
        die();
    } else {
        echo "LOGIN FAILED";
    }

?>