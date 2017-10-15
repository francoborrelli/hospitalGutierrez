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
$router->add('admin/users/{page:\d+}', ['controller' => 'User', 'action' => 'show']);
$router->add('admin/users/{action}', ['controller' => 'User']);
$router->add('admin/{controller}/{action}');

$router->add('patients', ['controller' => 'Patient', 'action' => 'index']);
$router->add('patients/{page:\d+}', ['controller' => 'Patient', 'action' => 'index']);
$router->add('patients/{action}', ['controller' => 'Patient']);
$router->add('patient/{id:\d+}', ['controller' => 'Patient', 'action' => 'show']);
$router->add('patient/{id:\d+}/{action}', ['controller' => 'Patient']);

$router->add('admin/config', ['controller' => 'Config', 'action' => 'index']);

$router->add('login', ['controller' => 'Login', 'action' => 'show']);
$router->add('login/{action}', ['controller' => 'Login']);
$router->add('logout', ['controller' => 'Login', 'action' => 'destroy']);

$router->dispatch($_SERVER['QUERY_STRING']);
