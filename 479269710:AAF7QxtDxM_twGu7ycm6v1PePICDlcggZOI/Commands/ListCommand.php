<?php

namespace Bot\Command;

require(dirname(__FILE__).'/../Response.php');

use Bot\Response;

class ListCommand
{
    private $name;

    public function __construct()
    {
        $this->name = '/turnos';
    }

    public function execute($request)
    {
        $response = new Response();

        $params = $request->getParams();

        if ((!($params[0] === "") && (count($params) == 1))) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_URL, 'https://grupo2.proyecto2017.linti.unlp.edu.ar/api/index.php/turnos/' . $params[0]);
            $result = json_decode(curl_exec($ch), true);
            curl_close($ch);

            if (isset($result['error'])) {
                    $response->addText($result['description']);
            } elseif(!empty($result)) {
                $response->addText('Los turnos disponibles son:' . PHP_EOL . PHP_EOL);

                foreach ($result as $turn) {
                    $date = new DateTime($turn['date']);
                    $response->addText('- ' . $date->format('H:i') . PHP_EOL);
                }
            } else{
                $response->addText('No hay turnos disponibles para esta fecha' . PHP_EOL);
            }
        } else {
            $response->addText('Debe ingresar una fecha con el formato dd-mm-aaaa');
        }

        $response->send();
    }

    public function getName()
    {
        return $this->name;
    }

}
