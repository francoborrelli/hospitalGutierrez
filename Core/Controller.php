<?php

namespace Core;

use Core\ORMConnection;

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
           echo "El método $method no se encontró en el controlador " . get_class($this); 
    }

    protected function before()
    {
    }

    protected function after()
    {
    }

    protected function render($template, $args = [])
    {
        View::renderTemplate($template, $args);
    }

    protected function getEntityManager()
    {
        return ORMConnection::getEntityManager(); 
    }

}
