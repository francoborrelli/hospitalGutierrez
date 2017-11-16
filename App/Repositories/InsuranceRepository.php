<?php

namespace App\Repositories;

use Core\APIRepository;
use App\Models\DocumentType;
use App\APIConf;

class InsuranceRepository extends APIRepository
{
    protected static $resources = [];

    const CLASS_NAME = 'Insurance';

    public static function findAll()
    {
        return self::findAllResources(APIConf::INSURANCE, self::CLASS_NAME);
    }

    public static function find($id)
    {
        return self::findResource(APIConf::INSURANCE, $id, self::CLASS_NAME);
    }

}
