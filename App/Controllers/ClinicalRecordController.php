<?php

namespace App\Controllers;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Core\Controller;
use App\Models\Patient;
use App\Models\ClinicalRecord;

class ClinicalRecordController extends Controller
{

    public function indexAction()
    {   
        $this->denyAccessUnlessPermissionGranted('historiaClinica_index');   

        $this->render('/Patients/ClinicalRecords/clinicalRecordsPage.html.twig', ['patient' => $this->getPatient()]);
    }

    public function showNewAction()
    {
        $this->denyAccessUnlessPermissionGranted('control_new'); 
                   
        $this->render('/Patients/ClinicalRecords/addRecord.html.twig', ['patient' => $this->getPatient()]);
    }

    public function NewAction()
    {
        $this->denyAccessUnlessPermissionGranted('control_new'); 
        
        $patient = $this->getPatient();
        
        $em = $this->getEntityManager();
        $userRepository = $em->getRepository(ClinicalRecord::class);

        $record = new ClinicalRecord($_POST, $patient, $this->getUser());

        $validationErrors = $record->validationErrors();

        if (empty($validationErrors)){
            $em->persist($record);
            $em->flush();

            $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha agregado el control correctamente.');
            $this->redirect("/patient/" . $patient->getId() . "/records");
        } else {
            $this->render('/Patients/ClinicalRecords/addRecord.html.twig', ['patient' => $this->getPatient(), 'newErrors' => $validationErrors, 'record' => $record, 'a' => $_POST['controlDate']]);
        }

    }

    public function showAction()
    {
        $this->denyAccessUnlessPermissionGranted('control_show'); 
        
        $this->render('/Patients/ClinicalRecords/recordPage.html.twig', ['patient' => $this->getPatient()]);
    }

    private function getPatient()
    {
        $id = $this->getRouteParams()['patient'];
        
        $em = $this->getEntityManager();
        
        $patient = $em->getRepository(Patient::class)->find($id);
        
        if(!isset($patient))
            throw new \Exception("Paciente $id no encontrado.", '404');

        return $patient;
    }

    private function getRecord()
    {
        $id = $this->getRouteParams()['record'];
        
        $em = $this->getEntityManager();
        
        $patient = $em->getRepository(ClinicalRecord::class)->find($id);
        
        if(!isset($patient))
            throw new \Exception("Control $id no encontrado.", '404');

        return $patient;
    }

}
