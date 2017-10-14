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
        $this->render('Patients/patientsTable.html.twig', ['patients' => $patients]);
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
        $data['waterType'] = $em->getRepository(WaterType::class)->find(1);
        $data['houseType'] = $em->getRepository(HouseType::class)->find(1);
        $data['heatingType'] = $em->getRepository(HeatingType::class)->find(1);
        $data['gender'] = $em->getRepository(Gender::class)->find(1);
        $data['documentType'] = $em->getRepository(DocumentType::class)->find(1);
        $data['insurance'] = $em->getRepository(Insurance::class)->find(1);
        return $data;
    }
    
}
