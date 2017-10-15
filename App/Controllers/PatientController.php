<?php

namespace App\Controllers;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
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

        $em = $this->getEntityManager();
        $patientRepository = $em->getRepository(Patient::class);
        $page = isset($this->getRouteParams()['page']) ? $this->getRouteParams()['page'] : 1;

        $firstName = $this->firstNameGiven();
        $lastName = $this->lastNameGiven();
        $documentType = $this->documentTypeGiven();
        $docNumber = $this->docNumberGiven();
        $patients = $patientRepository->findSearch($firstName, $lastName, $documentType, $docNumber);

        $patients = new ArrayCollection($patients);
        $pages = ceil($patients->count() / 2);
        $pages = ($pages == 0) ? 1 : $pages;
        $patients = $patients->matching(Criteria::create()
            ->setFirstResult(($page - 1) * 2)
            ->setMaxResults(2)
        );

        $data = ['patients' => $patients,
                 'page' => $page,
                 'pages' => $pages,
                 'patientFields' => $this->getPatientFields(),
                 'firstName' => $firstName,
                 'lastName' => $lastName,
                 'documentType' => $documentType,
                 'docNumber' => $docNumber];

        $this->render('Patients/patientsTable.html.twig', ['data' => $data]);
    }

    private function firstNameGiven()
    {
        if (isset($_GET['name']) && !empty($_GET['name']))
            return $_GET['name'];
        else
            return '';
    }

    private function docNumberGiven()
    {
        if (isset($_GET['docNumber']) && !empty($_GET['docNumber']))
            return $_GET['docNumber'];
        else
            return null;
    }

    private function lastNameGiven()
    {
        if (isset($_GET['lastName']) && !empty($_GET['lastName']))
            return $_GET['lastName'];
        else
            return null;
    }

    private function documentTypeGiven()
    {
        if (isset($_GET['documentType']) && !empty($_GET['documentType']))
            return $_GET['documentType'];
        else
            return null;
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
            $this->render('Patients/patientsTable.html.twig', ['newErrors' => $validationErrors, 'patient' => $patient]);
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
        $this->denyAccessUnlessOneGranted(array('paciente_show', 'datosDemograficos_show'));

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
        
        $validationPatient = clone $patient;
        $validationPatient->setData($data);
        
        $validationErrors = $validationPatient->validationErrors();
        if (empty($validationErrors)) {
            if ($mode == 'patient') 
                $patient->setData($data);
            else 
                $patient->setDemographicData($data);

            $em->flush();

            $this->addFlashMessage('success', '¡Felicitaciones!', 'Se han modificado los datos del paciente correctamente');
            $this->redirect('/patient/' . $this->getRouteParams()['id']);
        } else {
            $this->render('Patients/patientProfile.html.twig', ['editErrors' => $validationErrors, 'patient' => $validationPatient, 'mode' => $mode]);
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
