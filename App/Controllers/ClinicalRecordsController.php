<?php

namespace App\Controllers;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Core\Controller;
use App\Models\Patient;

class ClinicalRecordsController extends Controller
{

    public function indexAction()
    {   
        $this->denyAccessUnlessPermissionGranted('historiaClinica_index');   

        $this->render('/Patients/ClinicalRecords/clinicalRecordsPage.html.twig', ['patient' => $this->getPatient()]);
    }

    public function newAction()
    {
        $this->denyAccessUnlessPermissionGranted('historiaClinica_new');            
        $this->render('/Patients/ClinicalRecords/addRecord.html.twig', ['patient' => $this->getPatient()]);
    }

    private function getPatient()
    {
        $id = $this->getRouteParams()['id'];
        
        $em = $this->getEntityManager();
        
        $patient = $em->getRepository(Patient::class)->find($id);
        
        if(!isset($patient))
            throw new \Exception("Paciente $id no encontrado.", '404');

        return $patient;
    }

}
