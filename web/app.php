<?php

require __DIR__.'/../vendor/autoload.php';

$router = new Core\Router();

$router->add('', ['controller' => 'Home', 'action' => 'index']);
$router->add('admin/{controller}', ['action' => 'show']);
$router->add('admin/{controller}/{action}');
//$router->add('{controller}/{action}');

$router->dispatch($_SERVER['QUERY_STRING']);
