<?php

namespace App\Repositories;

use Doctrine\ORM\EntityRepository;

class ClinicalRecordRepository extends EntityRepository
{

    public function patientClinicalRecords($patient)
    {

        $qb = $this->createQueryBuilder('p');
        
        $qb->select('c')
        ->from('App\Models\ClinicalRecord','c');

        $qb->andWhere('c.deleted = :state')
        ->setParameter('state', false);

        $qb->andWhere('c.patient = :patient')
        ->setParameter('patient', $patient->getId());

        $qb->orderBy('c.controlDate', 'DESC');  

        return $qb->getQuery()->getResult();
    }

    public function PatientCount($patient)
    {
        $qb = $this->createQueryBuilder('p');
        
        $qb->select('Max(c.id)')
        ->from('App\Models\ClinicalRecord','c')
        ->where('c.patient = :patient')
        ->setParameter('patient', $patient->getId());  

        return $qb->getQuery()->getSingleScalarResult();
    }


}
