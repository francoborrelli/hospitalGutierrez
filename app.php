<?php

require __DIR__.'/vendor/autoload.php';

session_start();

date_default_timezone_set('America/Argentina/Buenos_Aires');

error_reporting(E_ALL);
set_error_handler('Core\Error::errorHandler');
set_exception_handler('Core\Error::exceptionHandler');

$router = new Core\Router();

$router->add('', ['controller' => 'Home', 'action' => 'index']);
$router->add('admin/{controller}', ['action' => 'show']);
$router->add('admin/{controller}/{action}');
$router->add('login', ['controller' => 'Login', 'action' => 'show']);
$router->add('login/{action}', ['controller' => 'Login']);
$router->add('logout', ['controller' => 'Login', 'action' => 'destroy']);
//$router->add('{controller}/{action}');

$router->dispatch($_SERVER['QUERY_STRING']);
