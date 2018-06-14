<?php

namespace Bot\Command;

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
        $response->addText('Los comandos disponibles son:' . PHP_EOL);
        $response->addText('/start Inicializa el bot' . PHP_EOL);
        $response->addText('/turnos dd-mm-aaaa Muestra los turnos disponibles del día' . PHP_EOL);
        $response->addText('/reservar dni dd-mm-aaaa hh:mm Realiza la reserva del turno' . PHP_EOL);
        $response->addText('/help Muestra esta ayuda');
        $response->send($request->getChatId());
    }

    public function getName()
    {
        return $this->name;
    }

}
