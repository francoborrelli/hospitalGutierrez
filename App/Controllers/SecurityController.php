<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\User;

class SecurityController extends Controller
{
    public function validateEmailAction()
    {
        $userRepository = $this->getEntityManager()->getRepository(User::class);
        $emailExists = true;
        if (isset($_GET['userId'])) {
            $originalEmail = $userRepository->find($_GET['userId'])->getEmail();
            if ($originalEmail == $_GET['email'])
                $emailExists = false;
        }
        if ($emailExists)
            $emailExists = $userRepository->emailExists($_GET['email']);

        header('Content-Type: application/json');
        echo json_encode(!$emailExists);
    }

    public function validateUserNameAction()
    {
        $userRepository = $this->getEntityManager()->getRepository(User::class);
        $userNameExists = true;
        if (isset($_GET['userId'])) {
            $originalUserName = $userRepository->find($_GET['userId'])->getUserName();
            if ($originalUserName == $_GET['username'])
                $userNameExists = false;
        }
        if ($userNameExists)
            $userNameExists = $this->getEntityManager()->getRepository(User::class)->usrExists($_GET['username']);

        header('Content-Type: application/json');
        echo json_encode(!$userNameExists);
    }

}
