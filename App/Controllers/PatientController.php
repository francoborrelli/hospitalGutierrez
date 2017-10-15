<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Patient;
use App\Models\WaterType;
use App\Models\HouseType;
use App\Models\HeatingType;
use App\Models\Insurance;
use App\Models\DocumentType;
use App\Models\Gender;

class PatientController extends Controller
{

    public function indexAction()
    {
        $patientRepository = $this->getEntityManager()->getRepository(Patient::class);
        $patients = $patientRepository->findAll();
        $this->render('Patients/patientsTable.html.twig', ['patients' => $patients, 'patientFields' => $this->getPatientFields()]);
    }

    public function newAction()
    {
        $em = $this->getEntityManager();

        $data = $this->getPatientData($_POST);
        $patient = new Patient($data);
        //$validationErrors = $patient->validationErrors();
        $validationErrors = [];
        if (empty($validationErrors)){
            $em->persist($patient);
            $em->flush();

            $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha agregado al paciente correctamente');
            $this->redirect('/patients');
        } else {
            $this->render('Patients/patientsTable.html.twig');
        }
    }

    private function getPatientData($data)
    {
        $em = $this->getEntityManager();
        $data['waterType'] = $em->getRepository(WaterType::class)->find($data['waterTypeId']);
        $data['houseType'] = $em->getRepository(HouseType::class)->find($data['houseTypeId']);
        $data['heatingType'] = $em->getRepository(HeatingType::class)->find($data['heatingTypeId']);
        $data['gender'] = $em->getRepository(Gender::class)->find($data['genderId']);
        $data['documentType'] = $em->getRepository(DocumentType::class)->find($data['documentTypeId']);
        $data['insurance'] = $em->getRepository(Insurance::class)->find($data['insuranceId']);
        return $data;
    }

    public function getPatientFields()
    {
        $em = $this->getEntityManager();
        $patientFields['waterType'] = $em->getRepository(WaterType::class)->findAll();
        $patientFields['houseType'] = $em->getRepository(HouseType::class)->findAll();
        $patientFields['heatingType'] = $em->getRepository(HeatingType::class)->findAll();
        $patientFields['gender'] = $em->getRepository(Gender::class)->findAll();
        $patientFields['documentType'] = $em->getRepository(DocumentType::class)->findAll();
        $patientFields['insurance'] = $em->getRepository(Insurance::class)->findAll();
        
        return $patientFields;
    }
    
}
