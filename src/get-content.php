<?php 
    namespace Pollio\Url;
    
    define("IS_DEV", true);

    function getJSFrom($page) {
        if (IS_DEV) {
            return getBaseURL(false) . $page . ".js";
        } else {
            
        }
    }

    function getBaseURL(bool $baseSite) {
        return (IS_DEV) ? (($baseSite) ? "http://localhost:8000/" : "http://localhost:8080/")  : "http://www.webdev.cs.uregina.ca/~dsa005/pollio/";
    }
?>