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

    public function findByUsernameAndState($username, $state)
    {
        $qb = $this->createQueryBuilder('u')
            ->from('App\Models\User', 'p');

        if (!empty($username)) {
            $qb->andWhere('LOWER(u.username) LIKE :username')
                ->setParameter('username', '%'.$username.'%');
        }

        if (!empty($state)) {
            $qb->andWhere('u.active = :active')
               ->setParameter('active', $state == 'active');
        }

        return $qb->getQuery()->getResult();
    }


}
