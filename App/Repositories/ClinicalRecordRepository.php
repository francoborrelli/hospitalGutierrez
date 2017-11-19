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
        
        $qb->select('Max(c.controlNumber)')
        ->from('App\Models\ClinicalRecord','c')
        ->where('c.patient = :patient')
        ->setParameter('patient', $patient->getId());  

        return $qb->getQuery()->getSingleScalarResult();
    }

    private function getTypeData($records, $patient, $amount, $period, $action)
    {
        $res = [];
        foreach ($records as $record) {
            $res[$record->getControlDate()->format($period)] = $record;
        }

        $result = [];
        $date = clone $patient->getBirthday();
        for ($i = 0; $i<=$amount; $i++) {
            if (isset($res[$date->format($period)])) {
                $result[] = $res[$date->format($period)]->$action();
            } else {
                $result[] = null;
            }
            if ($period == 'Y-m')
                $date->add(new \DateInterval("P1M"));
            else
                $date->add(new \DateInterval("P1$period"));
        }
        return $result;
    }

    public function findWeightData($patient)
    {
        $qb = $this->queryBuilderPeriod($patient, 13, 'W');
        $weightRecords = $qb->getQuery()->getResult();
        return $this->getTypeData($weightRecords, $patient, 13, 'W', 'getWeight');
    }

    public function findHeightData($patient)
    {
        $qb = $this->queryBuilderPeriod($patient, 24, 'M');
        $qb->andWhere('c.height is not null');
        $heightRecords = $qb->getQuery()->getResult();
        return $this->getTypeData($heightRecords, $patient, 24, 'Y-m', 'getHeight');
    }

    public function findPpcData($patient)
    {
        $qb = $this->queryBuilderPeriod($patient, 13, 'W');
        $qb->andWhere('c.ppc is not null');
        $ppcRecords =  $qb->getQuery()->getResult();
        return $this->getTypeData($ppcRecords, $patient, 13, 'W', 'getPpc');
    }
    
    private function queryBuilderPeriod($patient, $amount, $period)
    {
        $qb = $this->createQueryBuilder('p')
            ->select('c')
            ->from('App\Models\ClinicalRecord', 'c');
        $date = clone $patient->getBirthday();
        $date->setTime(23, 59, 59);
        $qb->andWhere('c.patient = :patient')
            ->andWhere('c.deleted = false')
            ->setParameter('patient', $patient)
            ->andWhere('c.controlDate <= :date')
            ->setParameter('date', $date->add(new \DateInterval("P{$amount}{$period}")))
            ->orderBy('c.controlDate');
        return $qb;
    }


}
