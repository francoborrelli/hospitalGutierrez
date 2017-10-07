<?php

require '../vendor/autoload.php';

$router = new Core\Router();
    
$router->dispatch($_SERVER['QUERY_STRING']);
