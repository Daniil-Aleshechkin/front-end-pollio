<?php 
    namespace Pollio\Url;
    
    define("IS_DEV", false);

    function getJSFrom($page) {
        if (IS_DEV) {
            return getBaseURL(false) . $page . ".js";
        } else {
            if ($page == "main_page") {
                $baseDir = "../dist/";
            } else {
                $baseDir = "../../dist/";
            }

            foreach (scandir(realpath($baseDir. $page .'/js' )) as $file ){
                if (pathinfo($file, PATHINFO_EXTENSION) == 'js') {
                    return $baseDir + $page . '/js' . '/' . $file;
                }
            }
        }
    }

    function getCSSLinkFrom($page) {
        if (!IS_DEV) {
            if ($page == "main_page") {
                $baseDir = "../dist/";
            } else {
                $baseDir = "../../dist/";
            }

            foreach (scandir(realpath($baseDir . $page .'/css' )) as $file ){
                if (pathinfo($file, PATHINFO_EXTENSION) == 'css') {
                    $URL = $baseDir + $page . '/css' . '/' . $file;
                    return "<link href=\"{$URL}\" rel=\"stylesheet\"/>";
                }
            }
        }
    }
    
    function getBaseURL(bool $baseSite) {
        return (IS_DEV) ? (($baseSite) ? "http://localhost:8000/" : "http://localhost:8080/")  : "http://www.webdev.cs.uregina.ca/~dsa005/";
    }
?>