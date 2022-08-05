<?php
    namespace Pollio\DataAccess;

    use PDO;

    function getConnection() {
        return new PDO("mysql:host=localhost;dbname=dsa005", "root", "admin");
    }
?>