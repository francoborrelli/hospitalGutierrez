<?php

namespace App;

use Core\ORMConnection;
use App\Models\User;

class Authentication
{

    public static function login($user)
    {
        session_regenerate_id(true);
        $_SESSION['userId'] = $user->getId();
    }

    public static function logout()
    {
      $_SESSION = [];
      if (ini_get('session.use_cookies')) {
          $params = session_get_cookie_params();

          setcookie(
              session_name(),
              '',
              time() - 42000,
              $params['path'],
              $params['domain'],
              $params['secure'],
              $params['httponly']
          );
      }
      session_destroy();
    }

    public static function rememberRequestedPage()
    {
        $_SESSION['returnTo'] = $_SERVER['REQUEST_URI'];
    }

    public static function returnPage()
    {
        if (isset($_SESSION['returnTo'])) 
            return $_SESSION['returnTo'];
        else
            return '/';
    }

    public static function getUser()
    {
        if (isset($_SESSION['userId'])) {
            $userRepository = ORMConnection::getEntityManager()->getRepository(User::class);
            return $userRepository->find($_SESSION['userId']);
        }
    }

}
