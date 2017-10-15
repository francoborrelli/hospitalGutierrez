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
        $this->denyAccessUnlessPermissionGranted('paciente_index');

        $patientRepository = $this->getEntityManager()->getRepository(Patient::class);
        $patients = $patientRepository->findAll();
        $this->render('Patients/patientsTable.html.twig', ['patients' => $patients, 'patientFields' => $this->getPatientFields()]);
    }

    public function newAction()
    {
        $this->denyAccessUnlessPermissionGranted('paciente_new');

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
            $this->addFlashMessage('danger', 'Noup.', 'Hubo errores');
            $this->render('Patients/patientsTable.html.twig');
        }
    }

    public function removeAction()
    {
        $this->denyAccessUnlessPermissionGranted('paciente_destroy');

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
        $this->denyAccessUnlessPermissionGranted('paciente_show');

        $em = $this->getEntityManager();
        $patient = $em->getRepository(Patient::class)->find($this->getRouteParams()['id']);
        $this->render('Patients/patientProfile.html.twig', ['patient' => $patient, 'patientFields' => $this->getPatientFields()]);
    }

    public function editPatientAction()
    {
        $this->edit($this->getPatientData($_POST), 'patient');
    }

    public function editDemographicAction()
    {
        $this->edit($this->getDemographicData($_POST), 'demographic');
    }

    private function edit($data, $mode)
    {
        $em = $this->getEntityManager();
        
        $patientRepository = $em->getRepository(Patient::class);

        $patient = $patientRepository->find($this->getRouteParams()['id']);
        $validationErrors = [];
        if (empty($validationErrors)) {
            if ($mode == 'patient')
                $patient->setData($data);
            else
                $patient->setDemographicData($data);
            $em->flush();

            $this->addFlashMessage('success', '¡Felicitaciones!', 'Se han modificado los datos del usuario correctamente');
            $this->redirect('/patient/' . $this->getRouteParams()['id']);
        } else {
            $this->addFlashMessage('danger', '¡Felicitaciones!', 'Se han modificado los datos del usuario correctamente');
            $this->render('Patients/patientProfile.html.twig');
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
