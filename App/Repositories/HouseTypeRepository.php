<?php

namespace App\Repositories;

use Core\APIRepository;
use App\Models\DocumentType;
use App\APIConf;

class HouseTypeRepository extends APIRepository
{
    protected static $resources = [];

    const CLASS_NAME = 'HouseType';

    public static function findAll()
    {
        return self::findAllResources(APIConf::HOUSE_TYPE, self::CLASS_NAME);
    }

    public static function find($id)
    {
        return self::findResource(APIConf::HOUSE_TYPE, $id, self::CLASS_NAME);
    }

}
