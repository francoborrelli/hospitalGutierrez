<?php

namespace App\Repositories;

use Core\APIRepository;
use App\Models\DocumentType;
use App\APIConf;

class DocumentTypeRepository extends APIRepository
{

    const CLASS_NAME = 'DocumentType';

    public static function findAll()
    {
        return self::findAllResources(APIConf::DOCUMENT_TYPE, self::CLASS_NAME);
    }

    public static function find($id)
    {
        return self::findResource(APIConf::DOCUMENT_TYPE, $id, self::CLASS_NAME);
    }

}
