<?php

namespace App\Controllers;

use Core\Controller;

class PatientController extends Controller
{

    public function indexAction()
    {
        $this->render('Patients/patientsTable.html.twig');
    }
    
}
