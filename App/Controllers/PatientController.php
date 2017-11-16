<?php

namespace App\Controllers;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Core\Controller;
use App\Models\Patient;
use App\Models\Gender;
use App\Repositories\DocumentTypeRepository;
use App\Repositories\HouseTypeRepository;
use App\Repositories\WaterTypeRepository;
use App\Repositories\HeatingTypeRepository;
use App\Repositories\InsuranceRepository;

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

        $this->render('Patients/List/patientsTable.html.twig', ['data' => $data, 'newErrors' => $validationErrors, 'patient' => $patient]);
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

    private function getPatientById($id){
        $em = $this->getEntityManager();
        $patientRepository = $em->getRepository(Patient::class);

        $patient = $patientRepository->find($id);
        
        if(!isset($patient))
            throw new \Exception("Paciente $id no encontrado.", '404');

        return $patient;
    }

    public function newAction()
    {
        $this->denyAccessUnlessPermissionGranted('paciente_new');

        $em = $this->getEntityManager();
        $patientRepository = $em->getRepository(Patient::class);

        $patient = $patientRepository->patientExists($_POST['documentTypeId'], $_POST['documentNumber']);

        if (!is_null($patient) && $patient->isDeleted()) {
            $this->redirect('/patient/' . $patient->getId() . '/exists');
        } else {
            $data = $this->getPatientData($_POST);
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

    public function reactivateAction()
    {
        $id = $this->getRouteParams()['id'];
        $patient = $this->getPatientById($id);

        if (! $patient->isDeleted())
            throw new \Exception("Accion no permitida.", '403');

        $this->addFlashMessage('warning', '¡Atención!', 'El paciente con el documento ingresado ya existe pero se encuentra desactivado.');
        $this->redirect("/patient/$id");
    }

    public function removeAction()
    {
        $this->denyAccessUnlessPermissionGranted('paciente_destroy');

        $em = $this->getEntityManager();

        $id = $this->getRouteParams()['id'];
        $patient = $this->getPatientById($id);
        
        if ($patient->isDeleted())
            throw new \Exception("Accion no permitida.", '403');

        $patient->delete();
        $em->flush();

        $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha eliminado al paciente correctamente.');
        $this->redirect('/patients');
    }

    public function activateAction()
    {
        $this->denyAccessUnlessPermissionGranted('paciente_update');

        $em = $this->getEntityManager();

        $id = $this->getRouteParams()['id'];
        $patient = $this->getPatientById($id);

        $patient->activate();
        $em->flush();

        $this->addFlashMessage('success', '¡Felicitaciones!', 'Se ha activado al paciente correctamente.');
        $this->redirect('/patients');
    }

    public function showAction()
    {
        $this->denyAccessUnlessOneGranted(array('paciente_show', 'datosDemograficos_show'));

        $id = $this->getRouteParams()['id'];
        $patient = $this->getPatientById($id);

        $this->render('Patients/patientProfile.html.twig', ['patient' => $patient, 'patientFields' => $this->getPatientFields()]);
    }

    public function editPatientAction()
    {
        $em = $this->getEntityManager();
        $id = $this->getRouteParams()['id'];
        $patient = $this->getPatientById($id);

        $documentChange = $patient->validateDocumentChange($_POST['documentTypeId'], $_POST['documentNumber']);

        $validationPatient = clone $patient;
        $validationPatient->setData($this->getPatientData($_POST));

        $patientExists = false;
        if ($documentChange)
            $patientExists = $em->getRepository(Patient::class)->patientExists($_POST['documentTypeId'], $_POST['documentNumber']);

        $validationErrors = $validationPatient->validationErrors($patientExists);
        if (empty($validationErrors)) {
            $patient->setData($this->getPatientData($_POST));
            $em->flush();
            $this->addFlashMessage('success', '¡Felicitaciones!', 'Se han modificado los datos del paciente correctamente.');
            $this->redirect('/patient/' . $this->getRouteParams()['id']);
        } else {
            $this->render('Patients/Profile/patientProfile.html.twig', ['editErrors' => $validationErrors, 'patient' => $validationPatient, 'mode' => 'patient', 'patientFields' => $this->getPatientFields()]);
        }
    }

    public function editDemographicAction()
    {
        $em = $this->getEntityManager();

        $id = $this->getRouteParams()['id'];
        $patient = $this->getPatientById($id);

        $validationPatient = clone $patient;
        $validationPatient->setDemographicData($_POST);
        $validationErrors = $validationPatient->validationErrors(false);
        if (empty($validationErrors)) {
            $patient->setDemographicData($_POST);
            $em->flush();
            $this->addFlashMessage('success', '¡Felicitaciones!', 'Se han modificado los datos del paciente correctamente.');
            $this->redirect('/patient/' . $this->getRouteParams()['id']);
        } else {
            $this->render('Patients/patientProfile.html.twig', ['editErrors' => $validationErrors, 'patient' => $validationPatient, 'mode' => 'demographic', 'patientFields' => $this->getPatientFields()]);
        }
    }

    private function getPatientData($data)
    {
        $em = $this->getEntityManager();
        $data['gender'] = $em->getRepository(Gender::class)->find($data['genderId']);
        return $data;
    }

    public function getPatientFields()
    {
        $em = $this->getEntityManager();
        $patientFields['waterType'] = WaterTypeRepository::findAll();
        $patientFields['houseType'] = HouseTypeRepository::findAll();
        $patientFields['heatingType'] = HeatingTypeRepository::findAll();
        $patientFields['gender'] = $em->getRepository(Gender::class)->findAll();
        $patientFields['documentType'] = DocumentTypeRepository::findAll();
        $patientFields['insurance'] = InsuranceRepository::findAll();
        return $patientFields;
    }

}
