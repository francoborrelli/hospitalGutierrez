<?php

namespace Bot\Command;

use Bot\Response;

class StartCommand
{
    private $name;

    public function __construct()
    {
        $this->name = '/start';
    }

    public function execute($request)
    {
        $response = new Response();
        $response->addText('Hola ' . $request->getFirstName() . PHP_EOL);
        $response->addText('¿Como puedo ayudarte? /help');
        $response->send($request->getChatId());
    }

    public function getName()
    {
        return $this->name;
    }

}
