<?php

require '../Core/Router.php';

$router = new Core\Router();
    
$router->dispatch($_SERVER['QUERY_STRING']);
