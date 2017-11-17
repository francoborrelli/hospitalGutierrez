<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use App\Models\Turn;

require '../vendor/autoload.php';

date_default_timezone_set('America/Argentina/Buenos_Aires');

$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => true
    ]
]);
$app->get('/turnos/{date}', function (Request $request, Response $response) {
    $date = $request->getAttribute('date');

    $em = \Core\ORMConnection::getEntityManager();
    $turnsRepository = $em->getRepository(Turn::class);

    $turns = $turnsRepository->findAllDate($date);

    return $response->withJson($turns, 200);
});
$app->run();
