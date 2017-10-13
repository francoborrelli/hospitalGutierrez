<?php

namespace App;

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
        return $_SESSION['returnTo'] ?? '/';
    }

}
