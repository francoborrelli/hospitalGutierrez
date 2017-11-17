<?php

namespace Bot\Command;

require(dirname(__FILE__).'/../Response.php');

use Bot\Response;

class ReserveCommand
{
    private $name;

    public function __construct()
    {
        $this->name = '/reservar';
    }

    public function execute($request)
    {
        $response = new Response();

        $params = $request->getParams();

        if (count($params) == 3) {
            $ch = curl_init();
            $url = 'https://grupo2.proyecto2017.linti.unlp.edu.ar/api/index.php/turnos/' . $params[0] . '/fecha/' . $params[1] . '/hora/' . $params[2];
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = json_decode(curl_exec($ch), true);
            curl_close ($ch);
            $response->addText($result['description']);
        } else {
            $response->addText('Debe ingresar los datos con el formato dni dd-mm-aaaa hh-mm');
        }

        $response->send($request->getChatId());
    }

    public function getName()
    {
        return $this->name;
    }

}
