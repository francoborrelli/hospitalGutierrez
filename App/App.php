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

        //Reports
        $this->router->add('reports', ['controller' => 'Report', 'action' => 'index']);

        // Clinical Records
        $this->router->add('patient/{patient:\d+}/records', ['controller' => 'ClinicalRecord', 'action' => 'index']);
        $this->router->add('patient/{patient:\d+}/records/{page:\d+}', ['controller' => 'ClinicalRecord', 'action' => 'index']);
        $this->router->add('patient/{patient:\d+}/records/{action}', ['controller' => 'ClinicalRecord']);
        $this->router->add('patient/{patient:\d+}/record/{record:\d+}', ['controller' => 'ClinicalRecord', 'action' => 'show']);
        $this->router->add('patient/{patient:\d+}/record/{record:\d+}/{action}', ['controller' => 'ClinicalRecord']);

        // Patients
        $this->router->add('patients', ['controller' => 'Patient', 'action' => 'index']);
        $this->router->add('patients/{page:\d+}', ['controller' => 'Patient', 'action' => 'index']);
        $this->router->add('patients/{action}', ['controller' => 'Patient']);
        $this->router->add('patient/{id:\d+}', ['controller' => 'Patient', 'action' => 'show']);
        $this->router->add('patient/{id:\d+}/exists', ['controller' => 'Patient', 'action' => 'reactivate']);
        $this->router->add('patient/{id:\d+}/{action}', ['controller' => 'Patient']);

        // Configuration
        $this->router->add('config', ['controller' => 'Config', 'action' => 'index']);
        $this->router->add('config/update', ['controller' => 'Config', 'action' => 'update']);
        $this->router->add('config/articles', ['controller' => 'Article', 'action' => 'showEdit']);
        $this->router->add('config/articles/update', ['controller' => 'Article', 'action' => 'update']);

        // Authentication
        $this->router->add('login', ['controller' => 'Login', 'action' => 'show']);
        $this->router->add('login/{action}', ['controller' => 'Login']);
        $this->router->add('logout', ['controller' => 'Login', 'action' => 'destroy']);
    }

}
