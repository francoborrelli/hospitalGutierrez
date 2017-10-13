<?php
use Doctrine\ORM\Tools\Console\ConsoleRunner;
use Core\ORMConnection;

$entityManager = ORMConnection::getEntityManager(); 

return ConsoleRunner::createHelperSet($entityManager);
