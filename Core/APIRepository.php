<?php

namespace Core;

use App\APIConf;

class APIRepository
{

    protected static $resources = [];

    protected static function get($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        $result=curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    protected static function findAllResources($resource, $className)
    {
        if (empty(self::$resources)) {
            $array = json_decode(self::get(APIConf::API_URL.$resource), true);
            foreach ($array as $resource) {
                $class = '\App\Models\\'.$className;
                self::$resources[] = new $class($resource['id'], $resource['nombre']);
            }
        }
        return self::$resources;
    }

    protected static function findResource($resource, $id, $className) {
        foreach(self::$resources as $resource) {
            if ($resource->getId() == $id) {
                return $resource;
            }
        }
        $resource = json_decode(self::get(APIConf::API_URL.$resource.'/'.$id), true);
        $class = '\App\Models\\'.$className;
        $resource =  new $class($resource['id'], $resource['nombre']);
        self::$resources[] = $resource;
        return $resource;
    }

}
