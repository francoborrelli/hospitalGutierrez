<?php

namespace Core;

use App\APIConf;

class APIRepository
{

    protected static $resources = [];

    private static $ch = null;

    protected static function get($url)
    {
        if (self::$ch === null) {
            self::$ch = curl_init();
        }
        curl_setopt(self::$ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt(self::$ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(self::$ch, CURLOPT_URL, $url);
        $result=curl_exec(self::$ch);
        return $result;
    }

    public static function closeCurl()
    {
        curl_close(self::$ch);
    }

    protected static function findAllResources($resource, $className)
    {
        $array = json_decode(self::get(APIConf::API_URL.$resource), true);
        foreach ($array as $res) {
            $class = '\App\Models\\'.$className;
            self::$resources[$resource][] = new $class($res['id'], $res['nombre']);
        }
        return self::$resources[$resource];
    }

    protected static function findResource($resource, $id, $className) {
        if (!array_key_exists($resource, self::$resources)) {
            self::$resources[$resource] = [];
        }
        foreach(self::$resources[$resource] as $res) {
            if ($res->getId() == $id) {
                return $res;
            }
        }
        $res = json_decode(self::get(APIConf::API_URL.$resource.'/'.$id), true);
        if (!array_key_exists('error', $res)) {
            $class = '\App\Models\\'.$className;
            $res =  new $class($res['id'], $res['nombre']);
            self::$resources[$resource] = $res;
            return $res;
        } else {
            return null;
        }
    }

}
