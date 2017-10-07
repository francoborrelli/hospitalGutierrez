<?php

require __DIR__.'/../vendor/autoload.php';

$router = new Core\Router();

$router->add('', ['controller' => 'Home', 'action' => 'index']);
    
$router->dispatch($_SERVER['QUERY_STRING']);
