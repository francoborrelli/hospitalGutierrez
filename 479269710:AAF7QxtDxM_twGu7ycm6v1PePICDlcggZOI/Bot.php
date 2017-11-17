<?php

namespace Bot;

require './Commands/ListCommand.php';
require './Request.php';

use Bot\Command\ListCommand;

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
        //$this->commands[] = new ReserveCommand();
    }

    public function run()
    {
        $this->request = new Request(file_get_contents('php://input'));
        $this->dispatchCommand($this->request);
    }

    private function dispatchCommand($request)
    {
        $command = $this->findCommand($request->getCommandName());
        $command->execute($request);
    }

    private function findCommand($commandName)
    {
        foreach ($this->commands as $command) {
            if ($command->getName() == $commandName)
                return $command;
        }
    }

}
