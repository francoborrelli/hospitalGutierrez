<?php

namespace Bot;

class Response
{
    private $text = "";

    public function addText($text)
    {
        $this->text .= $text;
    }

    public function send($chatId)
    {
        $url = 'https://api.telegram.org/bot479269710:AAF7QxtDxM_twGu7ycm6v1PePICDlcggZOI/sendMessage';

        $msg = array();
        $msg['chat_id'] = $chatId;
        $msg['text'] = $this->text;
        $msg['disable_web_page_preview'] = true;
        $msg['reply_markup'] = null;

        $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($msg)
            )
        );

        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        exit(0);
    }

}
