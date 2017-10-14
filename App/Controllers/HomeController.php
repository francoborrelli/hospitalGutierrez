<?php

namespace App\Controllers;

use Core\View;
use Core\Controller;

class HomeController extends Controller
{

    public function indexAction()
    {
        $this->render('Home/index.html.twig');
    }

}
