<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\User;
use App\Authentication;

class Login extends Controller
{
    public function showAction()
    {
        $this->render('Login/login.html.twig');
    }

    public function createAction()
    {
        $userRepository = $this->getEntityManager()->getRepository(User::class);
        $user = $userRepository->findOneBy(['email' => $_POST['email']]);
        if (is_null($user) || !$user->validatePassword($_POST['pass']))
            $user = false;

        if ($user) {
            Authentication::login($user);
            $this->redirect(Authentication::returnPage());
        } else {
            $this->render('Login/login.html.twig', ['email' => $_POST['email']]);
        }
    }

    public function destroyAction()
    {
        Authentication::logout();
        $this->redirect('/');
    }

}
