<?php

namespace App\Controllers;

use Core\View;
use Core\Controller;
use App\Models\Patient;
use App\Repositories\DocumentTypeRepository;
use App\Repositories\HouseTypeRepository;
use App\Repositories\WaterTypeRepository;
use App\Repositories\HeatingTypeRepository;
use App\Repositories\InsuranceRepository;

class ReportController extends Controller
{

    public function indexAction()
    {
        $this->denyAccessUnlessPermissionGranted('reportes_index'); 

        $data = $this->getGraphicsData();

        $this->render('Reports/reportsPage.html.twig', ['data' => $data]);
    }

    private function getGraphicsData()
    {
        $graphicData = [];

        $em = $this->getEntityManager();
        $repository = $em->getRepository(Patient::class);

        $graphicData['total'] = $repository->patientsAmount();
        $graphicData['refrigerator'] = $repository->refrigeratorAmount();
        $graphicData['pet'] = $repository->petAmount();
        $graphicData['electricity'] = $repository->electricityAmount();

        return $graphicData;
    }

}
