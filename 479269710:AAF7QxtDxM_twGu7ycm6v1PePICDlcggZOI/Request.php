<?php

namespace Bot;

class Request
{

    private $commandName;

    private $params = [];

    private $chatId;

    public function __construct($input)
    {
        $response = json_decode($input, true);

        $this->chatId = $response['message']['chat']['id'];

        $regExp = '#^(\/[a-zA-Z0-9\/]+?)(\ .*?)$#i';
        preg_match($regExp, $response['message']['text'], $aResults);

        if (isset($aResults[1])) {
            $this->commandName = trim($aResults[1]);
            $cmd_params = trim($aResults[2]);
        } else {
            $this->commandName = trim($response['message']['text']);
            $cmd_params = '';
        }

        $this->params = explode(' ', $cmd_params);
    }

    public function getCommandName()
    {
        return $this->commandName;
    }

    public function getChatId()
    {
        return $this->chatId;
    }

    public function getParams()
    {
        return $this->params;
    }

}
