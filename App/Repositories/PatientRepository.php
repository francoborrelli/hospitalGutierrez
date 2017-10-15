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
            $qb->andWhere('p.firstName = :firstName')
               ->setParameter('firstName', $firstName);
        }

        if (!empty($lastname)) {
            $qb->andwhere('p.lastname = :lastname')
               ->setparameter('lastname', $lastname);
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
