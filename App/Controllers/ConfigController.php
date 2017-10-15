<?php

namespace App\Controllers;

use Core\Controller;

class ConfigController extends Controller
{

    public function indexAction()
    {
        $this->render('Config/config.html.twig');
    }

}
