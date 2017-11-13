<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\User;
use App\Models\Patient;

class SecurityController extends Controller
{
    public function validateEmailAction()
    {
        $userRepository = $this->getEntityManager()->getRepository(User::class);
        $emailExists = true;
        if (isset($_GET['userId'])) {
            $originalEmail = $userRepository->find($_GET['userId'])->getEmail();
            if ($originalEmail == $_GET['email'])
                $emailExists = false;
        }
        if ($emailExists)
            $emailExists = $userRepository->emailExists($_GET['email']);

        header('Content-Type: application/json');
        echo json_encode(!$emailExists);
    }

    public function validateUserNameAction()
    {
        $userRepository = $this->getEntityManager()->getRepository(User::class);
        $userNameExists = true;
        if (isset($_GET['userId'])) {
            $originalUserName = $userRepository->find($_GET['userId'])->getUserName();
            if ($originalUserName == $_GET['username'])
                $userNameExists = false;
        }
        if ($userNameExists)
            $userNameExists = $this->getEntityManager()->getRepository(User::class)->usrExists($_GET['username']);

        header('Content-Type: application/json');
        echo json_encode(!$userNameExists);
    }

    public function validatePatientDocumentAction()
    {
        $patientRepository = $this->getEntityManager()->getRepository(Patient::class);
        header('Content-Type: application/json');

        if (isset($_GET['modified']) && $_GET['modified'] === 'false'){
            echo json_encode(true);
        }
        else{
            $patient = $patientRepository->patientExists($_GET['documentTypeId'], $_GET['documentNumber']);
            if (!is_null($patient) && !$patient->isDeleted())
              echo json_encode(false);
            else
              echo json_encode(true);
        };
    }
}
