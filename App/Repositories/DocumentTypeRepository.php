<?php

namespace App\Repositories;

use Core\APIrepository;
use App\Models\DocumentType;

class DocumentTypeRepository extends APIrepository
{

    private static $docTypes = [];

    public static function findAll()
    {
        if (empty(self::$docTypes)) {
            $array = json_decode(self::get('https://api-referencias.proyecto2017.linti.unlp.edu.ar/tipo-documento'), true);
            foreach ($array as $docType) {
                self::$docTypes[] = new DocumentType($docType['id'], $docType['nombre']);
            }
        }
        return self::$docTypes;
    }

    public static function find($id)
    {
        foreach(self::$docTypes as $docType) {
            if ($docType->getId() == $id) {
                return $docType;
            }
        }
        $docType = json_decode(self::get('https://api-referencias.proyecto2017.linti.unlp.edu.ar/tipo-documento/'.$id), true);
        $docType =  new DocumentType($docType['id'], $docType['nombre']);
        self::$docTypes[] = $docType;
        return $docType;
    }

}