<?php

namespace App\Repositories;

use Doctrine\ORM\EntityRepository;

class PatientRepository extends EntityRepository
{

    public function findSearch($firstName, $lastName, $documentType, $docNumber, $state = 'active')
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
            $qb->andWhere('p.documentTypeId = :documentType')
               ->setParameter('documentType', $documentType);
        }

        if (!empty($docNumber)) {
            $qb->andwhere('p.docNumber LIKE :docNumber')
               ->setparameter('docNumber', '%'.$docNumber.'%');
        }

        $qb->andWhere('p.deleted = :deleted')
           ->setParameter('deleted', $state == 'deleted');

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
            ->andWhere('p.documentTypeId = :docType')
            ->setParameter('docNumber', $documentNumber)
            ->setParameter('docType', $documentTypeId);
        $patients = $qb->getQuery()->getSingleResult();
        $em = $this->getEntityManager();
        $em->remove($patients);
        $em->flush();
    }

    private function queryBuilderAmount(){
        $qb = $this->createQueryBuilder('p')
        ->select('count(Distinct l.id)')
        ->from('App\Models\Patient', 'l')
        ->andWhere('l.deleted = false');

        return $qb;
    }

    private function getMultipleAmountsOf($type){
        $qb = $this->createQueryBuilder('p')
        ->select("count(Distinct l.id) as amount, l.$type")
        ->from('App\Models\Patient', 'l')
        ->andWhere('l.deleted = false')
        ->groupBy("l.$type");

        $result = $qb->getQuery()->getResult();

        return $this->transformArray($result, $type);
    }

    public function getPatientsAmount(){

        $qb = $this->queryBuilderAmount();

        return $qb->getQuery()->getSingleScalarResult();
    }

    public function getRefrigeratorAmount(){
        $qb = $this->queryBuilderAmount();
        $qb->andWhere('l.refrigerator = true');
        
        return $qb->getQuery()->getSingleScalarResult();
    }

    public function getPetAmount(){
        $qb = $this->queryBuilderAmount();
        $qb->andWhere('l.pet = true');
        
        return $qb->getQuery()->getSingleScalarResult();
    }

    public function getElectricityAmount(){
        $qb = $this->queryBuilderAmount();
        $qb->andWhere('l.electricity = true');
        
        return $qb->getQuery()->getSingleScalarResult();
    }

    public function getHouseTypeAmounts(){
        return $this->getMultipleAmountsOf('houseTypeId');

    }

    public function getWaterTypeAmounts(){
        return $this->getMultipleAmountsOf('waterTypeId');
    }

    public function getHeatingTypeAmounts(){
        return $this->getMultipleAmountsOf('heatingTypeId');
    }

    private function transformArray($array, $type){
        $result = [];

        foreach($array as $item) {
            $result[$item[$type]] = (int)$item['amount'];
        }

        return $result;
    }
}
