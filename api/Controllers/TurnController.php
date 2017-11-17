<?php

namespace Api\Controllers;

use App\Models\Turn;

class TurnController
{
    public function getTurnsAction($request, $response, $args)
    {
        $em = \Core\ORMConnection::getEntityManager();
        $turnsRepository = $em->getRepository(Turn::class);
        $turns = $turnsRepository->findAllDate($args['date']);
        $code = 200;
        if (array_key_exists('error', $turns))
            $code = 404;
        return $response->withJson($turns, $code);
    }

    public function reserveAction($request, $response, $args)
    {
        $em = \Core\ORMConnection::getEntityManager();
        $turnsRepository = $em->getRepository(Turn::class);
        $turn = $turnsRepository->reserve($args);
        $code = 200;
        if (array_key_exists('error', $turn))
            $code = 404;
        return $response->withJson($turn, $code);
    }
}
