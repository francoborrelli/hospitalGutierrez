<?php

namespace App\Controllers;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Core\Controller;
use App\Models\Patient;
use App\Models\ClinicalRecord;
use App\Repositories\ClinicalRecordRepository;

class ClinicalRecordController extends Controller
{

    public function indexAction()
    {   
        $this->denyAccessUnlessPermissionGranted('historiaClinica_index'); 
        
        $data = $this->getIndexData();
      
        $this->render('/Patients/ClinicalRecords/clinicalRecordsPage.html.twig', ['data' => $data]);
    }

    private function getIndexData()
    {
        $em = $this->getEntityManager();
        $clinicalRecordRepository = $em->getRepository(ClinicalRecord::class);

        $page = isset($this->getRouteParams()['page']) ? $this->getRouteParams()['page'] : 1;
        $patient = $this->getPatient();

        $records = $clinicalRecordRepository->patientClinicalRecords($patient);

        $listAmount = $this->getSite()->getListAmount();
        $records = new ArrayCollection($records);
        $pages = ceil($records->count() / $listAmount);
        $pages = ($pages == 0) ? 1 : $pages;
        $records = $records->matching(Criteria::create()
            ->setFirstResult(($page - 1) * $listAmount)
            ->setMaxResults($listAmount)
        );

        $data = ['patient' => $patient,
                 'clinicalRecords' => $records,
                 'page' => $page,
                 'pages' => $pages];

        return $data;
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
        $clinicalRecordRepository = $em->getRepository(ClinicalRecord::class);


        $id = intval($clinicalRecordRepository->PatientCount($patient)) +1;

        $record = new ClinicalRecord($_POST, $id, $patient, $this->getUser());

        $validationErrors = $record->validationErrors();

        if (empty($validationErrors)){
            $em->persist($record);
            $em->flush();

            $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha agregado el control correctamente.');
            $this->redirect("/patient/" . $patient->getId() . "/records");
        } else {
            var_dump($_POST['vaccination']);
            $this->render('/Patients/ClinicalRecords/addRecord.html.twig', ['patient' => $this->getPatient(), 'newErrors' => $validationErrors, 'record' => $record, 'a' => $_POST['controlDate']]);
        }

    }

    public function showAction()
    {
        $this->denyAccessUnlessPermissionGranted('control_show'); 

        $record = $this->getRecord();
        
        $this->render('/Patients/ClinicalRecords/recordPage.html.twig', ['clinicalRecord' => $record]);
    }


    public function removeAction()
    {
        $this->denyAccessUnlessPermissionGranted('control_destroy'); 

        $record = $this->getRecord(); 
        $record->delete();

        $em = $this->getEntityManager();
        $userRepository = $em->getRepository(ClinicalRecord::class);
        $em->persist($record);
        $em->flush();

        $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha borrado el control correctamente.');
        $this->redirect("/patient/" . $record->getPatient()->getId() . "/records");
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

        $patient = $this->getPatient();

        $record = $em->getRepository(ClinicalRecord::class)->findOneBy(['patient' => $patient, 'id' => $id]);
        
        if(!isset($record))
            throw new \Exception('Control ' . $id .' de ' . $patient->getFirstName() . ' ' . $patient->getLastName() . ' no encontrado.', 404);
        elseif ($record->isDeleted())
            throw new \Exception('Control ' . $id . ' de ' . $patient->getFirstName() . ' ' . $patient->getLastName() . ' esta borrado.', 404);

        return $record;
    }
}
