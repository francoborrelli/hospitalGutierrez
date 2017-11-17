<?php

namespace Bot\Command;

require_once(dirname(__FILE__).'/../Response.php');

use Bot\Response;

class HelpCommand
{
    private $name;

    public function __construct()
    {
        $this->name = '/help';
    }

    public function execute($request)
    {
        $response = new Response();
        $response->addText('Los comandos disponibles son estos:' . PHP_EOL);
        $response->addText('/start Inicializa el bot' . PHP_EOL);
        $response->addText('/turnos dd-mm-aaaa Muestra los turnos disponibles del día' . PHP_EOL);
        $response->addText('/reservar dd-mm-aaaa hh:mm Realiza la reserva del turno' . PHP_EOL);
        $response->addText('/help Muestra esta ayuda flaca');
        $response->send($request->getChatId());
    }

    public function getName()
    {
        return $this->name;
    }

}
