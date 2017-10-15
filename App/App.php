<?php

namespace App;

class App
{
    private $router;

    public function __construct()
    {
        $this->router = new \Core\Router();
        $this->loadRoutes();
    }

    public function handleRequest($url)
    {
        $this->router->dispatch($url);
    }

    private function loadRoutes()
    {
        // Home
        $this->router->add('', ['controller' => 'Home', 'action' => 'index']);

        // Users
        $this->router->add('admin/users', ['controller' => 'User', 'action' => 'show']);
        $this->router->add('admin/users/{page:\d+}', ['controller' => 'User', 'action' => 'show']);
        $this->router->add('admin/users/{action}', ['controller' => 'User']);
        $this->router->add('admin/{controller}/{action}');

        // Patients
        $this->router->add('patients', ['controller' => 'Patient', 'action' => 'index']);
        $this->router->add('patients/{page:\d+}', ['controller' => 'Patient', 'action' => 'index']);
        $this->router->add('patients/{action}', ['controller' => 'Patient']);
        $this->router->add('patient/{id:\d+}', ['controller' => 'Patient', 'action' => 'show']);
        $this->router->add('patient/{id:\d+}/{action}', ['controller' => 'Patient']);

        // Configuration
        $this->router->add('admin/config', ['controller' => 'Config', 'action' => 'index']);
        $this->router->add('admin/articles/update', ['controller' => 'ArticleController', 'action' => 'update']);

        // Authentication
        $this->router->add('login', ['controller' => 'Login', 'action' => 'show']);
        $this->router->add('login/{action}', ['controller' => 'Login']);
        $this->router->add('logout', ['controller' => 'Login', 'action' => 'destroy']);
    }

}
