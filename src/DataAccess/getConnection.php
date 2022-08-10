<?php
    namespace Pollio\DataAccess;

    use PDO;

    function getConnection() {
        if (IS_DEV) {
            return new PDO("mysql:host=localhost;dbname=dsa005", "root", "admin");
        } else {
            return new PDO("mysql:host=localhost;dbname=dsa005", "dsa005", "USKHNs2YqnTte2j");
        }
    }
?>