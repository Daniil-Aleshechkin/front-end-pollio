<?php 
    namespace Pollio\Url;
    
    define("IS_DEV", true);

    function getJSFrom($page) {
        return getBaseURL(false) . $page . ".js";
    }

    function getBaseURL(bool $baseSite) {
        return (IS_DEV) ? (($baseSite) ? "http://localhost:8000/" : "http://localhost:8080/")  : "";
    }
?>