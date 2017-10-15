<?php

require __DIR__.'/vendor/autoload.php';

session_start();

date_default_timezone_set('America/Argentina/Buenos_Aires');

error_reporting(E_ALL);
set_error_handler('Core\Error::errorHandler');
set_exception_handler('Core\Error::exceptionHandler');

$app = new App\App();
$app->handleRequest($_SERVER['QUERY_STRING']);
