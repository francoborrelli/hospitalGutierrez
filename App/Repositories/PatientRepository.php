<?php

namespace App\Repositories;

use Doctrine\ORM\EntityRepository;

class PatientRepository extends EntityRepository
{

    public function findSearch($firstName, $lastName, $documentType, $docNumber)
    {
        $qb = $this->createQueryBuilder('p')
            ->from('App\Models\Patient', 'l');

        if (!empty($firstName)) {
            $qb->andWhere('LOWER(p.firstName) LIKE :firstName')
                ->setParameter('firstName', '%'.$firstName.'%');
        }

        if (!empty($lastName)) {
            $qb->andwhere('LOWER(p.lastName) LIKE :lastname')
               ->setparameter('lastname', '%'.$lastName.'%');
        }

        if (!empty($documentType)) {
            $qb->andWhere('p.documentType = :documentType')
               ->setParameter('documentType', $documentType);
        }

        if (!empty($docNumber)) {
            $qb->andwhere('p.docNumber = :docNumber')
               ->setparameter('docNumber', $docNumber);
        }

        return $qb->getQuery()->getResult();
    }


}
