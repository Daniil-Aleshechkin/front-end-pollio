<?php 
    namespace Pollio\Url;
    
    define("IS_DEV", true);

    function getJSFrom($page) {
        return getBaseURL() . $page . ".js";
    }

    function getBaseURL() {
        return (IS_DEV) ? "http://localhost:8080/" : "";
    }
?>