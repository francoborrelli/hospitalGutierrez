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
        $data = $this->getDemographicData($data);
        $patient = new Patient($data);
        $validationErrors = $patient->validationErrors();
        if (empty($validationErrors)){
            $em->persist($patient);
            $em->flush();

            $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha agregado al paciente correctamente');
            $this->redirect('/patients');
        } else {
            $this->render('Patients/patientsTable.html.twig', ['newErrors' => $validationErrors, 'patient' => $patient]);
        }
    }

    public function removeAction()
    {
        $em = $this->getEntityManager();
        $patientRepository = $em->getRepository(Patient::class);
        $patient = $patientRepository->find($this->getRouteParams()['id']);
        $em->remove($patient);
        $em->flush();

        $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha eliminado al paciente correctamente');
        $this->redirect('/patients');
    }

    public function showAction()
    {
        $em = $this->getEntityManager();
        $patient = $em->getRepository(Patient::class)->find($this->getRouteParams()['id']);
        $this->render('Patients/patientProfile.html.twig', ['patient' => $patient, 'patientFields' => $this->getPatientFields()]);
    }

    public function editAction()
    {
        $em = $this->getEntityManager();
        $patientRepository = $em->getRepository(Patient::class);

        $patient = $patientRepository->find($this->getRouteParams()['id']);
        $data = $this->getPatientData($_POST);

        $validationErrors = $patient->validationErrors();
        if (empty($validationErrors)) {
            $patient->setData($data);
            $em->flush();

            $this->addFlashMessage('success', '¡Felicitaciones!', 'Se han modificado los datos del usuario correctamente');
            $this->redirect('/patient/' . $this->getRouteParams()['id']);
        } else {
            $this->render('Patients/patientProfile.html.twig', ['newErrors' => $validationErrors, 'patient' => $patient]);
        }
    }

    private function getPatientData($data)
    {
        $em = $this->getEntityManager();
        $data['gender'] = $em->getRepository(Gender::class)->find($data['genderId']);
        $data['documentType'] = $em->getRepository(DocumentType::class)->find($data['documentTypeId']);
        $data['insurance'] = $em->getRepository(Insurance::class)->find($data['insuranceId']);
        return $data;
    }

    private function getDemographicData($data)
    {
        $em = $this->getEntityManager();
        $data['waterType'] = $em->getRepository(WaterType::class)->find($data['waterTypeId']);
        $data['houseType'] = $em->getRepository(HouseType::class)->find($data['houseTypeId']);
        $data['heatingType'] = $em->getRepository(HeatingType::class)->find($data['heatingTypeId']);
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
