<?php

namespace App\Controllers;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Core\Controller;
use App\Models\User;
use App\Models\Role;

class UserController extends Controller
{

    public function showAction()
    {
        $this->denyAccessUnlessPermissionGranted('usuario_index');

        $userRepository = $this->getEntityManager()->getRepository(User::class);
        if (isset($this->getRouteParams()['page']))
            $page = $this->getRouteParams()['page'];
        else
            $page = 1;

        if (true || isset($_GET['username'])) {
            $qb = $userRepository->createQueryBuilder('u');
	    $qb->select('u')
                ->from('App\Models\User', 'a')
                ->where('u.username = :username')
                ->setParameter('username', 'pedrobrost' );
	    $users = $qb->getQuery()->getResult();
        }
        $users = $userRepository->findAll();
        $users = new ArrayCollection($users);
        $pages = ceil($users->count() / 1);
        $pages = ($pages == 0) ? 1 : $pages;
        $users = $users->matching(Criteria::create()
            ->setFirstResult(($page - 1) * 1)
            ->setMaxResults(1)
        );
        $this->render('Users/usersTable.html.twig', ['users' => $users, 'page' => $page, 'pages' => $pages, 'data' => $this->getData()]);
    }

    public function newAction()
    {
        $this->denyAccessUnlessPermissionGranted('usuario_new');

        $em = $this->getEntityManager();
        $userRepository = $em->getRepository(User::class);

        if (!empty($_POST['roles']))
            $roles = $em->getRepository(Role::class)->findById($_POST['roles']);
        else
            $roles = null;

        $user = new User($_POST, $roles);
        $validationErrors = $this->userValidation($user);
        if (empty($validationErrors)){
            $em->persist($user);
            $em->flush();

            $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha agregado al usuario correctamente');
            $this->redirect('/admin/users');
        } else {
            $this->render('Users/usersTable.html.twig', ['data' => $this->getData(), 'newErrors' => $validationErrors, 'user' => $user]);
        }
    }

    public function editAction()
    {
        
        $this->denyAccessUnlessPermissionGranted('usuario_update');

        $em = $this->getEntityManager();
        $userRepository = $em->getRepository(User::class);

        $user = $em->getRepository(User::class)->find($_POST['userId']);
        $originalEmail = $user->getEmail();
        $originalUserName = $user->getUsername();
        $validationUser = clone $user;

        if (!empty($_POST['roles']))
            $roles = $em->getRepository(Role::class)->findById($_POST['roles']);
        else
            $roles = [];

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

            $this->addFlashMessage('success', '¡Felicitaciones!', 'Se han modificado los datos del usuario correctamente');
            $this->redirect('/admin/users');
        } else {
            $this->render('Users/usersTable.html.twig', ['data' => $this->getData(), 'editErrors' => $validationErrors, 'user' => $validationUser]);
        }
         
    }

    public function removeAction()
    {
        $this->denyAccessUnlessPermissionGranted('usuario_destroy');

        $em = $this->getEntityManager();
        $user = $em->getRepository(User::class)->find($_POST['deletedId']);
        $em->remove($user);
        $em->flush();

        $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha eliminado al usuario correctamente');
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
        $roles = $em->getRepository(Role::class)->findAll();
        return ['roles' => $roles];
    }

}
