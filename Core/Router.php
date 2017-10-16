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
                foreach ($matches as $key => $match) {
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

            if ($this->siteInMaintenance() && $controller != 'App\Controllers\ConfigController' && $controller != 'App\Controllers\LoginController') {
                $this->renderMaintenance();
                exit;
            }

            if (class_exists($controller)) {
                $controller_instance = new $controller($this->params);
                $this->executeAction($controller_instance);
            } else
                throw new \Exception("Controlador $controller no ecnontrado");
        } else 
            throw new \Exception('Ruta no encontrada', 404);
    } 

    private function getController()
    {
        $controller = $this->params['controller'];
        $controller = $this->convertToPascalCase($controller);
        return $this->getNamespace() . $controller . 'Controller';
    }

    private function executeAction($controller_instance)
    {
        $action = $this->params['action'];
        $action = $this->convertToCamelCase($action);
        if (preg_match('/action$/i', $action) == 0)
            $controller_instance->$action();
        else
            throw new \Exception("El método $action no puede ser llamado directamente, se debe remover el sufijo Action.");
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

    private function getNamespace()
    {
        $namespace = 'App\Controllers\\';

        if (array_key_exists('namespace', $this->params))
            $namespace .= $this->params['namespace'] . '\\';
        
        return $namespace;
    }

    private function siteInMaintenance()
    {
        return ! \App\Site::getSite()->getEnabled();
    }
    
    private function renderMaintenance()
    {
        \Core\View::renderTemplate('Exceptions/maintenance.html.twig', []);
    }
         

}    
