<?php

namespace App\Repositories;

use Doctrine\ORM\EntityRepository;

class PatientRepository extends EntityRepository
{

    public function findSearch($firstName, $lastName, $documentType, $docNumber)
    {
        $qb = $this->createQueryBuilder('p')
            ->from('App\Models\Patient', 'l')
            ->where('p.deleted = 0');

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
            $qb->andwhere('p.docNumber LIKE :docNumber')
               ->setparameter('docNumber', '%'.$docNumber.'%');
        }

        return $qb->getQuery()->getResult();
    }

    public function patientExists($documentTypeId, $documentNumber)
    {
        if ((!is_null($patient = $this->docNumberExists($documentNumber))) &&
            $this->docTypeExists($patient, $documentTypeId))
            return $patient;
        return null;
    }

    private function docNumberExists($documentNumber)
    {
        return $this->findOneBy(['docNumber' => $documentNumber]);
    }

    private function docTypeExists($patient, $documentTypeId)
    {
        return $patient->getDocumentTypeId() == $documentTypeId;
    }

    public function deleteIfExists($documentTypeId, $documentNumber)
    {
        $qb = $this->createQueryBuilder('p')
            ->from('App\Models\Patient', 'l')
            ->where('p.deleted = 1')
            ->andWhere('p.docNumber = :docNumber')
            ->andWhere('p.documentType = :docType')
            ->setParameter('docNumber', $documentNumber)
            ->setParameter('docType', $documentTypeId);
        $patients = $qb->getQuery()->getSingleResult();
        $em = $this->getEntityManager();
        $em->remove($patients);
        $em->flush();
    }


}
