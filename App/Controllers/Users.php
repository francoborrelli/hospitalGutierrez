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
        $em = $this->getEntityManager();

        $user = new User($_POST);
        $userRepository = $em->getRepository(User::class);
        $usrExists = $userRepository->usrExists($user->getUsername());
        $emailExists = $userRepository->emailExists($user->getEmail());
        $validationErrors = $user->validationErrors($usrExists, $emailExists);
        if (empty($validationErrors)){
            $em->persist($user);
            $em->flush();

            //$this->addFlashMessage('Usuario agregado correctamente');
            $this->redirect('/admin/users');
        } else {
            $this->render('Users/usersTable.html.twig', ['errors' => $validationErrors, 'user' => $user]);
            //$this->render('utils/dump.html.twig', ['var' => $validationErrors]);
        }
    }

}
