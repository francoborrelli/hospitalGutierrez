<?php

namespace Bot;

require_once './Commands/ListCommand.php';
require_once './Commands/ReserveCommand.php';
require_once './Commands/HelpCommand.php';
require_once './Commands/StartCommand.php';
require_once './Request.php';
require_once './Response.php';

use Bot\Command\ListCommand;
use Bot\Command\ReserveCommand;
use Bot\Command\HelpCommand;
use Bot\Command\StartCommand;

class Bot
{
    private $request;
    private $commands = [];

    public function __construct()
    {
        $this->loadCommands();
    }

    private function loadCommands()
    {
        $this->commands[] = new ListCommand();
        $this->commands[] = new ReserveCommand();
        $this->commands[] = new HelpCommand();
        $this->commands[] = new StartCommand();
    }

    public function run()
    {
        $this->request = new Request(file_get_contents('php://input'));
        $this->dispatchCommand($this->request);
    }

    private function dispatchCommand($request)
    {
        $command = $this->findCommand($request);
        $command->execute($request);
    }

    private function findCommand($request)
    {
        $commandName = $request->getCommandName();
        foreach ($this->commands as $command) {
            if ($command->getName() == $commandName)
                return $command;
        }
        $this->sendDefaultMessage($request);
    }

    private function sendDefaultMessage($request)
    {
        $response = new Response();
        $response->addText('Lo siento, no es un comando válido.' . PHP_EOL);
        $response->addText('Prueba /help para ver la lista de comandos disponibles');
        $response->send($request->getChatId());
    }

}
