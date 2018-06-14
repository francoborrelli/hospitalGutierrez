<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use App\Models\Turn;

require '../vendor/autoload.php';

date_default_timezone_set('America/Argentina/Buenos_Aires');

$app = new \Slim\App();

$app->get('/turnos/{date}', '\Api\Controllers\TurnController:getTurnsAction');
$app->post('/turnos/{dni}/fecha/{date}/hora/{hour}', '\Api\Controllers\TurnController:reserveAction');

$app->run();
