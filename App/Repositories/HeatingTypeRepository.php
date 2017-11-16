<?php

namespace App\Repositories;

use Core\APIRepository;
use App\Models\DocumentType;
use App\APIConf;

class HeatingTypeRepository extends APIRepository
{
    protected static $resources = [];

    const CLASS_NAME = 'HeatingType';

    public static function findAll()
    {
        return self::findAllResources(APIConf::HEATING_TYPE, self::CLASS_NAME);
    }

    public static function find($id)
    {
        return self::findResource(APIConf::HEATING_TYPE, $id, self::CLASS_NAME);
    }

}
