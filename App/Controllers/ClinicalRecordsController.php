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
        $id = $this->getRouteParams()['id'];

        $em = $this->getEntityManager();
        $patient = $em->getRepository(Patient::class)->find($id);

        if(!isset($patient))
            throw new \Exception("Paciente $id no encontrado.", '404');
            
        $this->render('/Patients/ClinicalRecords/clinicalRecordsPage.html.twig', ['patient' => $patient]);
    }

}
