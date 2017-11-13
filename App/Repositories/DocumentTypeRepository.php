<?php

namespace App\Repositories;

use Core\APIrepository;
use App\Models\DocumentType;

class DocumentTypeRepository extends APIrepository
{
    public static function findAll()
    {
        $array = json_decode(self::get('https://api-referencias.proyecto2017.linti.unlp.edu.ar/tipo-documento'), true);
        $docTypes = [];
        foreach ($array as $docType) {
            $docTypes[] = new DocumentType($docType['id'], $docType['nombre']);
        }
        return $docTypes;
    }

    public static function find($id)
    {
        $docType = json_decode(self::get('https://api-referencias.proyecto2017.linti.unlp.edu.ar/tipo-documento/'.$id), true);
        return new DocumentType($docType['id'], $docType['nombre']);
    }

}