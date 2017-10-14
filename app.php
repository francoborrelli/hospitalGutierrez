<?php

require __DIR__.'/vendor/autoload.php';

session_start();

date_default_timezone_set('America/Argentina/Buenos_Aires');

error_reporting(E_ALL);
set_error_handler('Core\Error::errorHandler');
set_exception_handler('Core\Error::exceptionHandler');

$router = new Core\Router();

$router->add('', ['controller' => 'Home', 'action' => 'index']);

$router->add('admin/users', ['controller' => 'User', 'action' => 'show']);
$router->add('admin/users/{action}', ['controller' => 'User']);

$router->add('login', ['controller' => 'Login', 'action' => 'show']);
$router->add('login/{action}', ['controller' => 'Login']);
$router->add('logout', ['controller' => 'Login', 'action' => 'destroy']);

$router->dispatch($_SERVER['QUERY_STRING']);
