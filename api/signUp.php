<?php

    require_once realpath("../src/get-content.php");
    require_once realpath("../src/DataAccess/getConnection.php");
    require_once realpath("../vendor/mervick/aes-everywhere/php/src/AES256.php");

    use mervick\aesEverywhere\AES256;

    use function Pollio\DataAccess\getConnection;
    use function Pollio\Url\getBaseURL;

    function signUpQuery($username, $email, $passwordHash, $saltKey, $profileURL) {
        return "INSERT INTO Users (
            Username,
            ProfileURL,
            PasswordHash,
            Saltkey, 
            Email,
            CreatedDate
        )
        VALUES('$username', '$profileURL', 0x$passwordHash, 0x$saltKey, '$email', CURDATE());";
    }

    function firstUserQuery() {
        return "SELECT UserId FROM users ORDER BY UserId DESC LIMIT 1";
    }

    function uploadImageFile($file) {
        $imageFileType = strtolower(pathinfo($file,PATHINFO_EXTENSION));
        $uploadOk = 1;
        echo $file;

        // Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
            $check = getimagesize($_FILES["profile"]["tmp_name"]);
            if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
            } else {
            echo "File is not an image.";
            $uploadOk = 0;
            }
        }

        if (file_exists($file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
        } else {
            if (!move_uploaded_file($_FILES["profile"]["tmp_name"], "../uploads/" . $file)) {
               echo "Sorry, there was an error uploading your file.";
            } else {
                return $file; 
            }
        }
        return "";
    }

    try {
        $connection = getConnection();
        $AES = new AES256();
        
        $password = $_POST["password"];

        $passwordHashBase = hash("sha256", $password, true);
        $saltKey = random_int(0,PHP_INT_MAX);
        $passwordHashSalted = hash("sha256",$passwordHashBase . $saltKey, true);
        $saltKeyEncrypted = $AES->encrypt($saltKey,"unsecurekey");
        
        $file = basename($_FILES["profile"]["name"]);
        
        $baseURL = getBaseURL(true);
        $fileURL = "{$baseURL}uploads/" . uploadImageFile($saltKey . basename($_FILES["profile"]["name"]));

        if ($fileURL != "") {
            $connection->query(signUpQuery($_POST["username"], $_POST["email"], bin2hex($passwordHashSalted), bin2hex($saltKeyEncrypted), 'api/'.$fileURL));
            foreach ($connection->query(firstUserQuery()) as $row) {
                if ($_SESSION['UserId'] == null) {
                    session_destroy();
                }
                
                session_start();
                $_SESSION['UserId'] = $row["UserId"];
                $_SESSION['Username'] = $_POST["username"];
                
                header("Location: {$baseURL}pollio/poll_management");
                die();
            }
        }
    } catch (PDOException $ex) {
        echo $ex->getMessage();
    }
?>