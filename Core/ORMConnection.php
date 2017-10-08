<?php

namespace Core;

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
use App\Config;

class ORMConnection
{
    public static function getEntityManager()
    {
        static $entityManager = null;

        if ($entityManager === null) {
            $paths = array("../App/Models");
            $isDevMode = false;
            
            $dbParams = array(
                'driver'   => Config::DB_DRIVER,
                'user'     => Config::DB_USER,
                'password' => Config::DB_PASSWORD,
                'dbname'   => Config::DB_NAME,
            );

            $config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode);

            $entityManager = EntityManager::create($dbParams, $config);
        }

        return $entityManager;
    }
}
