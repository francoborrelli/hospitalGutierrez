<?php

namespace App\Controllers;

use Core\Controller;

class Users extends Controller
{

    public function showAction()
    {
        $this->render('Users/usersTable.html.twig');
    }

}
