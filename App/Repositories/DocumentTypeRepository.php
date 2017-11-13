<?php

namespace App\Repositories;

use Core\APIrepository;
use App\Models\DocumentType;

class DocumentTypeRepository extends APIrepository
{

    private static $docTypes = null;

    public static function findAll()
    {
        if (is_null(self::$docTypes)) {
            $array = json_decode(self::get('https://api-referencias.proyecto2017.linti.unlp.edu.ar/tipo-documento'), true);
            $docTypes = [];
            foreach ($array as $docType) {
                $docTypes[] = new DocumentType($docType['id'], $docType['nombre']);
            }
            self::$docTypes = $docTypes;
            return $docTypes;
        } else {
            return self::$docTypes;
        }
    }

    public static function find($id)
    {
        if (is_null(self::$docTypes)) {
            self::findAll();
        }
        $result = null;
        foreach(self::$docTypes as $docType) {
            if ($docType->getId() == $id) {
                $result = $docType;
                break;
            }
        }
        return $result;
        //$docType = json_decode(self::get('https://api-referencias.proyecto2017.linti.unlp.edu.ar/tipo-documento/'.$id), true);
        //return new DocumentType($docType['id'], $docType['nombre']);
    }

}