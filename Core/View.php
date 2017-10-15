<?php

namespace Core;

class View
{

    public static function renderTemplate($template, $args = [])
    {
        static $twig = null;

        if ($twig === null) {
            $loader = new \Twig_Loader_Filesystem('App/Views');
            $twig = new \Twig_Environment($loader);
            $twig->addGlobal('currentUser', \App\Authentication::getUser());
            $twig->addGlobal('flashes', \Core\Flash::getMessages());
            $twig->addGlobal('site', \App\Site::getSite());
        }

        echo $twig->render($template, $args);
    }

}

