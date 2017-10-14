<?php

namespace Core;

class Flash
{

    public static function addMessage($type, $title, $body)
    {
        if (!isset($_SESSION['flashMessages'])) {
            $_SESSION['flashMessages'] = [];
        }

        $_SESSION['flashMessages'][] = [
            'type' => $type,
            'title' => $title,
            'body' => $body
        ];
    }

    public static function getMessages()
    {
        if (isset($_SESSION['flashMessages'])) {
            $messages = $_SESSION['flashMessages'];
            unset($_SESSION['flashMessages']);

            return $messages;
        }
    }
}
