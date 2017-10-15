<?php

namespace Core;

use Core\ORMConnection;
use Core\Flash;
use App\Authentication;

abstract class Controller
{

    private $route_params = [];

    public function __construct($route_params)
    {
        $this->route_params = $route_params;
    }

    public function __call($name, $args)
    {
        $method = $name . 'Action';

        if (method_exists($this, $method)) {
            if ($this->before() !== false) {
                call_user_func_array([$this, $method], $args);
                $this->after();
            }
        } else
           throw new \Exception("El método $method no se encontró en el controlador " . get_class($this)); 
    }

    protected function before()
    {
    }

    protected function after()
    {
    }

    protected function getRouteParams()
    {
        return $this->route_params;
    }

    protected function render($template, $args = [])
    {
        View::renderTemplate($template, $args);
    }

    protected function redirect($path)
    {
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') {
	    $protocol = 'https://'; 	
        } else 
            $protocol = 'http://';
        header('Location: ' . $protocol . $_SERVER['HTTP_HOST'] . $path, true, 303); 
        exit;
    }

    protected function getEntityManager()
    {
        return ORMConnection::getEntityManager(); 
    }

    protected function requireLogin()
    {
        if (!Authentication::getUser()) {
            Authentication::rememberRequestedPage();
            $this->redirect('/login');
        }
    }

    protected function addFlashMessage($type, $title, $body)
    {
        Flash::addMessage($type, $title, $body);
    }

    protected function denyAccessUnlessPermissionGranted($permission)
    {
        $this->requireLogin();
        if (!$this->getUser()->hasPermission($permission)) {
            $this->addFlashMessage('warning', 'Lo sentimos.', "Usted posee los permisos necesarios para realizar la operacion");
            $this->redirect('/');
        }
    }

    protected function denyAccessUnlessOneGranted($permissions)
    {
        $this->requireLogin();
        foreach ($permissions as $permission) {
            if ($this->getUser()->hasPermission($permission)) {
                return;
            }
        }
        $this->addFlashMessage('warning', 'Lo sentimos.', "Usted posee el permiso");
        $this->redirect('/');
    }

    protected function getUser()
    {
        return Authentication::getUser();
    }

    protected function getSite()
    {
        return \App\Site::getSite();
    }

}
