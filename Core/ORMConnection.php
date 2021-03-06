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
            $paths = array(dirname(__DIR__) . '/App/Models');
            $isDevMode = true;
            
            $dbParams = array(
                'driver'   => Config::DB_DRIVER,
                'user'     => Config::DB_USER,
                'password' => Config::DB_PASSWORD,
                'dbname'   => Config::DB_NAME,
                'host'     => Config::DB_HOST,
            );

            $config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode);

            $entityManager = EntityManager::create($dbParams, $config);
        }

        return $entityManager;
    }
}
