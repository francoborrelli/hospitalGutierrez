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

    public function indexAction($validationErrors = null, $patient = null)
    {
        $this->denyAccessUnlessPermissionGranted('paciente_index');

        $em = $this->getEntityManager();
        $patientRepository = $em->getRepository(Patient::class);
        $page = isset($this->getRouteParams()['page']) ? $this->getRouteParams()['page'] : 1;

        $firstName = $this->firstNameGiven();
        $lastName = $this->lastNameGiven();
        $documentType = $this->documentTypeGiven();
        $docNumber = $this->docNumberGiven();
        $state = $this->stateGiven();
        $patients = $patientRepository->findSearch($firstName, $lastName, $documentType, $docNumber, $state);

        $listAmount = $this->getSite()->getListAmount();
        $patients = new ArrayCollection($patients);
        $pages = ceil($patients->count() / $listAmount);
        $pages = ($pages == 0) ? 1 : $pages;
        $patients = $patients->matching(Criteria::create()
            ->setFirstResult(($page - 1) * $listAmount)
            ->setMaxResults($listAmount)
        );

        $data = ['patients' => $patients,
                 'page' => $page,
                 'pages' => $pages,
                 'patientFields' => $this->getPatientFields(),
                 'firstName' => $firstName,
                 'lastName' => $lastName,
                 'documentType' => $documentType,
                 'docNumber' => $docNumber,
                 'state' => $state];

        $this->render('Patients/patientsTable.html.twig', ['data' => $data, 'newErrors' => $validationErrors, 'patient' => $patient]);
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

    private function stateGiven()
    {
        if (isset($_GET['state']) && !empty($_GET['state']))
            return $_GET['state'];
        else
            return null;
    }

    public function newAction()
    {
        $this->denyAccessUnlessPermissionGranted('paciente_new');

        $em = $this->getEntityManager();
        $patientRepository = $em->getRepository(Patient::class);

        $patient = $patientRepository->patientExists($_POST['documentTypeId'], $_POST['documentNumber']);
        if (!is_null($patient) && $patient->isDeleted()) {
            $this->editPatientAction($patient);
        } else {
            $data = $this->getPatientData($_POST);
            $data = $this->getDemographicData($data);
            $patient = new Patient($data);
            $patientExists = $patientRepository->patientExists($_POST['documentTypeId'], $_POST['documentNumber']);
            $validationErrors = $patient->validationErrors($patientExists);
            if (empty($validationErrors)){
                $em->persist($patient);
                $em->flush();

                $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha agregado al paciente correctamente.');
                $this->redirect('/patients');
            } else {
                $this->indexAction($validationErrors, $patient);
            }
        }
    }

    public function removeAction()
    {
        $this->denyAccessUnlessPermissionGranted('paciente_destroy');

        $em = $this->getEntityManager();
        $patientRepository = $em->getRepository(Patient::class);
        $patient = $patientRepository->find($this->getRouteParams()['id']);
        $patient->delete();
        $em->flush();

        $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha eliminado al paciente correctamente.');
        $this->redirect('/patients');
    }

    public function showAction()
    {
        $this->denyAccessUnlessOneGranted(array('paciente_show', 'datosDemograficos_show'));

        $em = $this->getEntityManager();
        $patient = $em->getRepository(Patient::class)->find($this->getRouteParams()['id']);
        $this->render('Patients/patientProfile.html.twig', ['patient' => $patient, 'patientFields' => $this->getPatientFields()]);
    }

    public function editPatientAction($patient = null)
    {
        $this->edit($this->getPatientData($_POST), 'patient', $patient);
    }

    public function editDemographicAction()
    {
        $this->edit($this->getDemographicData($_POST), 'demographic');
    }

    private function edit($data, $mode, $patient = null)
    {
        $em = $this->getEntityManager();

        if (is_null($patient)) {
            $patientRepository = $em->getRepository(Patient::class);
            $patient = $patientRepository->find($this->getRouteParams()['id']);
            $update = false;
            $patientRepository->deleteIfExists($_POST['documentTypeId'], $_POST['documentNumber']);
        } else {
            $update = true;
        }
        $documentChange = $patient->validateDocumentChange($_POST['documentTypeId'], $_POST['documentNumber']);

        $validationPatient = clone $patient;
        if ($mode == 'patient')
            $validationPatient->setData($data);
        else
            $validationPatient->setDemographicData($data);

        $patientExists = false;
        if ($documentChange)
            $patientExists = $em->getRepository(Patient::class)->patientExists($_POST['documentTypeId'], $_POST['documentNumber']);

        $validationErrors = $validationPatient->validationErrors($patientExists);
        if (empty($validationErrors)) {
            if ($mode == 'patient')
                $patient->setData($data);
            else
                $patient->setDemographicData($data);

            if ($update) {
                $patient->activate();
                $em->flush();
                $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha agregado al paciente correctamente.');
                $this->redirect('/patients');
            } else {
                $em->flush();
                $this->addFlashMessage('success', '¡Felicitaciones!', 'Se han modificado los datos del paciente correctamente.');
                $this->redirect('/patient/' . $this->getRouteParams()['id']);
            }
        } else {
            $this->render('Patients/patientProfile.html.twig', ['editErrors' => $validationErrors, 'patient' => $validationPatient, 'mode' => $mode, 'patientFields' => $this->getPatientFields()]);
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
