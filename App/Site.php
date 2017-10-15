<?php

namespace App;

use Core\ORMConnection;
use App\Models\Site as SiteEntity;

class Site
{
    public static function getSite()
    {
        return ORMConnection::getEntityManager()->getRepository(SiteEntity::class)->findAll()[0];
    }
}
