<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\User;

class Users extends Controller
{

    public function showAction()
    {
        $userRepository = $this->getEntityManager()->getRepository(User::class);
        $users = $userRepository->findAll();
        $this->render('Users/usersTable.html.twig', ['users' => $users]);
    }

    public function newAction()
    {
        $em = $this->getEntityManager();
        $userRepository = $em->getRepository(User::class);
        $user = new User($_POST);
        $validationErrors = $this->userValidation($user);
        if (empty($validationErrors)){
            $em->persist($user);
            $em->flush();

            //$this->addFlashMessage('Usuario agregado correctamente');
            $this->redirect('/admin/users');
        } else {
            $this->render('Users/usersTable.html.twig', ['users' => $userRepository->findAll(), 'newErrors' => $validationErrors, 'user' => $user]);
            //$this->render('utils/dump.html.twig', ['var' => $validationErrors]);
        }
    }

    public function editAction()
    {
        $em = $this->getEntityManager();
        $userRepository = $em->getRepository(User::class);

        $user = $em->getRepository(User::class)->find($_POST['userId']);
        $originalEmail = $user->getEmail();
        $originalUserName = $user->getUsername();
        $user->setData($_POST);
        $validationErrors = $this->userValidation($user);

        if ($user->getEmail() == $originalEmail) {
            if (($key = array_search('emailExists', $validationErrors)) !== false) {
                    unset($validationErrors[$key]);
            }
        }

        if ($user->getUsername() == $originalUserName) {
            if (($key = array_search('usrExists', $validationErrors)) !== false) {
                    unset($validationErrors[$key]);
            }
        }

        if (empty($validationErrors)) {
            $em->flush();

            $this->redirect('/admin/users');
        } else {
            $this->render('Users/usersTable.html.twig', ['users' => $userRepository->findAll(), 'editErrors' => $validationErrors, 'user' => $user]);
        }
         
    }

    private function userValidation($user)
    {
        $userRepository = $this->getEntityManager()->getRepository(User::class);
        $usrExists = $userRepository->usrExists($user->getUsername());
        $emailExists = $userRepository->emailExists($user->getEmail());
        return $user->validationErrors($usrExists, $emailExists);
    }

}
