<?php

namespace Core;

class Router
{

    private $routes = [];

    private $params = [];

    public function add($route, $params = [])
    {
        $route = preg_replace('/\//', '\\/', $route);
        $route = preg_replace('/\{([a-z]+)\}/', '(?P<\1>[a-z-]+)', $route);
        $route = preg_replace('/\{([a-z]+):([^\}]+)\}/', '(?P<\1>\2)', $route);

        $route = '/^' . $route . '$/i';

        $this->routes[$route] = $params;
    }

    public function match($url)
    {
        foreach ($this->routes as $route => $params) {
            if (preg_match($route, $url, $matches)) {
                foreach ($matches as $key => $matches) {
                    if (is_string($key)) {
                        $params[$key] = $match;
                    }
                }

                $this->params = $params;
                return true;
            }
        }

        return false;
    }

    public function dispatch($url)
    {
        $url = $this->removeQueryStringVariables($url);
        if ($this->match($url)) {

            $controller = $this->getController();
            if (class_exists($controller)) {
                $controller_instance = new $controller($this->params);
                $this->executeAction($controller_instance);
            } else
                echo "Controlador $controller no ecnontrado";

        } else 
            echo "Ruta no encontrada";
    } 

    private function getController()
    {
        $controller = $this->params['controller'];
        $controller = $this->convertToPascalCase($controller);
        $controller = $this->getNamespace() . $controller;
    }

    private function generateController($controller_instance)
    {
        $action = $this->getAction;
        $this->convertToCamelCase($action);
        if (preg_match('/action$/i', $action) == 0)
            $controller_instance->$action();
        else
            echo "El método $action no puede ser llamado directamente, se debe remover el sufijo Action";
    }

    private function convertToPascalCase($string)
    {
        return str_replace(' ', '', ucwords(str_replace('-', ' ', $string)));
    }

    private function convertToCamelCase($string)
    {
        return lcfirst($this->convertToPascalCase($string));
    }

    private function removeQueryStringVariables($url)
    {
        if ($url != '') {
            $parts = explode('&', $url, 2);
            
            if (strpos($parts[0], '=') === false) {
                $url = $parts[0];
            } else
                $url = '';
        }

        return $url;
    } 
       

}    
