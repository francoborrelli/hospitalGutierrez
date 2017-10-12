<?php

namespace App\Repositories;

use Doctrine\ORM\EntityRepository;

class UserRepository extends EntityRepository
{

    public function usrExists($userName)
    {
        return !is_null($this->findOneBy(['username' => $userName]));
    }

    public function emailExists($email)
    {
        return !is_null($this->findOneBy(['email' => $email]));
    }

}
