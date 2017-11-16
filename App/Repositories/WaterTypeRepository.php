<?php

namespace App\Repositories;

use Core\APIRepository;
use App\Models\DocumentType;
use App\APIConf;

class WaterTypeRepository extends APIRepository
{
    protected static $resources = [];

    const CLASS_NAME = 'WaterType';

    public static function findAll()
    {
        return self::findAllResources(APIConf::WATER_TYPE, self::CLASS_NAME);
    }

    public static function find($id)
    {
        return self::findResource(APIConf::WATER_TYPE, $id, self::CLASS_NAME);
    }

}
