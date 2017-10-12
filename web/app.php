<?php

require __DIR__.'/../vendor/autoload.php';

date_default_timezone_set('America/Argentina/Buenos_Aires');

$router = new Core\Router();

$router->add('', ['controller' => 'Home', 'action' => 'index']);
$router->add('admin/{controller}', ['action' => 'show']);
$router->add('admin/{controller}/{action}');
//$router->add('{controller}/{action}');

$router->dispatch($_SERVER['QUERY_STRING']);
