<?php

namespace Bot;

class Response
{
    private $text = "";

    public function addText($text)
    {
        $this->text .= $text;
    }

    public function send()
    {
        $url = 'https://api.telegram.org/bot479269710:AAF7QxtDxM_twGu7ycm6v1PePICDlcggZOI/sendMessage';

        $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($this->text)
            )
        );

        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        exit(0);
    }

}
