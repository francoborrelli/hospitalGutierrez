<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Patient;

class PatientController extends Controller
{

    public function indexAction()
    {
        $this->render('Patients/patientsTable.html.twig');
    }

    public function newAction()
    {
        $em = $this->getEntityManager();
        $userRepository = $em->getRepository(Patient::class);

        $data = $this->getPatientData($_POST);
        $patient = new Patient($data);
        $validationErrors = $patient->validationErrors();
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
         
    }
    
}
