<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\User;

class Users extends Controller
{

    public function showAction()
    {
        $this->render('Users/usersTable.html.twig');
    }

    public function newAction()
    {
        $user = new User();

        $user->setEmail($_POST['email']);
        $user->setFirstName($_POST['firstName']);
        $user->setLastName($_POST['lastName']);
        $user->setUsername($_POST['username']);
        $user->setPassword('test');

        $em = $this->getEntityManager();
        $em->persist($user);
        $em->flush();

        $this->render('Home/index.html.twig');
    }

}
