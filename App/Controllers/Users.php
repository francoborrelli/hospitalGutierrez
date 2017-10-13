<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\User;
use App\Models\Role;

class Users extends Controller
{

    protected function before()
    {
        $this->requireLogin();
    }

    public function showAction()
    {
        $this->render('Users/usersTable.html.twig', ['data' => $this->getData()]);
    }

    public function newAction()
    {
        $em = $this->getEntityManager();
        $userRepository = $em->getRepository(User::class);

        $roles = $em->getRepository(Role::class)->findById($_POST['roles']);
        $user = new User($_POST, $roles);
        $validationErrors = $this->userValidation($user);
        if (empty($validationErrors)){
            $em->persist($user);
            $em->flush();

            //$this->addFlashMessage('Usuario agregado correctamente');
            $this->redirect('/admin/users');
        } else {
            $this->render('Users/usersTable.html.twig', ['data' => $this->getData(), 'newErrors' => $validationErrors, 'user' => $user]);
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
        $validationUser = clone $user;
        $roles = $em->getRepository(Role::class)->findById($_POST['roles']);
        $validationUser->setData($_POST, $roles);
        $validationErrors = $this->userValidation($validationUser);

        if ($validationUser->getEmail() == $originalEmail) {
            if (($key = array_search('emailExists', $validationErrors)) !== false) {
                    unset($validationErrors[$key]);
            }
        }

        if ($validationUser->getUsername() == $originalUserName) {
            if (($key = array_search('usrExists', $validationErrors)) !== false) {
                    unset($validationErrors[$key]);
            }
        }

        if (empty($validationErrors)) {
            $user->setData($_POST, $roles);
            $em->flush();

            $this->redirect('/admin/users');
        } else {
            $this->render('Users/usersTable.html.twig', ['data' => $this->getData(), 'editErrors' => $validationErrors, 'user' => $validationUser]);
        }
         
    }

    public function removeAction()
    {
        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($_POST['deletedId']);
        $em->remove($user);
        $em->flush();
        $this->redirect('/admin/users');
    }

    private function userValidation($user)
    {
        $userRepository = $this->getEntityManager()->getRepository(User::class);
        $usrExists = $userRepository->usrExists($user->getUsername());
        $emailExists = $userRepository->emailExists($user->getEmail());
        return $user->validationErrors($usrExists, $emailExists);
    }

    public function getData(){
        $em = $this->getEntityManager();
        $users = $em->getRepository(User::class)->findAll();
        $roles = $em->getRepository(Role::class)->findAll();
        return ['users' => $users, 'roles' => $roles];
    }

}
